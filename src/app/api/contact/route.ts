import { NextRequest, NextResponse } from "next/server";
import { persistEnquiry, ConsultationRecord } from "@/lib/storage";

interface ContactRequestBody {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  // Honeypot field for bot spam prevention
  website?: string;
  // Client timestamp when form was rendered
  renderedAt?: number;
}

// In-memory rate limiting map for basic per-instance spam mitigation
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function pruneRateLimitMap(now: number) {
  if (rateLimitMap.size > 200) {
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, valid);
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();
    pruneRateLimitMap(now);

    // 1. Rate limiting by client IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const timestamps = rateLimitMap.get(clientIp) || [];
    const recentRequests = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many consultation requests from this address. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimitMap.set(clientIp, recentRequests);

    // 2. Parse request payload
    let body: ContactRequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, company, service, message, website, renderedAt } = body;

    // 3. Honeypot check (bots fill out the hidden 'website' field)
    if (website && website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        referenceId: `AC-${Date.now().toString(36).toUpperCase()}`,
        message: "Enquiry received.",
      });
    }

    // 4. Quick-fill bot check (submission completed in less than 800ms)
    if (renderedAt && typeof renderedAt === "number") {
      const elapsed = now - renderedAt;
      if (elapsed < 800) {
        return NextResponse.json(
          {
            success: false,
            error: "Form was submitted too quickly. Please take a moment to review your inquiry.",
          },
          { status: 400 }
        );
      }
    }

    // 5. Input validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    } else if (name.trim().length > 100) {
      errors.name = "Name must be under 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid business email address is required.";
    } else if (email.trim().length > 120) {
      errors.email = "Email must be under 120 characters.";
    }

    if (!service || typeof service !== "string" || service.trim().length === 0) {
      errors.service = "Please select a service area.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Please provide project details (minimum 10 characters).";
    } else if (message.trim().length > 3000) {
      errors.message = "Message exceeds maximum allowed length of 3000 characters.";
    }

    if (company && typeof company === "string" && company.trim().length > 120) {
      errors.company = "Company name must be under 120 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the provided information.",
          details: errors,
        },
        { status: 422 }
      );
    }

    // 6. Generate official unique Reference ID
    const referenceId = `AC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submissionRecord: ConsultationRecord = {
      referenceId,
      receivedAt: new Date().toISOString(),
      name: name?.trim() || "",
      email: email?.trim().toLowerCase() || "",
      company: company ? company.trim() : "Not specified",
      service: service?.trim() || "",
      message: message?.trim() || "",
      clientIp,
    };

    // 7. Durable local/serverless persistence
    const localPersisted = await persistEnquiry(submissionRecord);

    // 8. External webhook forwarding (Slack, Discord, CRM, etc.)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    let webhookDelivered = false;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `*New Autocratic Consultation Request* [${referenceId}]\n*Name:* ${submissionRecord.name}\n*Email:* ${submissionRecord.email}\n*Company:* ${submissionRecord.company}\n*Service:* ${submissionRecord.service}\n*Message:*\n${submissionRecord.message}`,
            record: submissionRecord,
          }),
        });
        if (webhookRes.ok) {
          webhookDelivered = true;
        } else {
          console.warn(`[Contact API] Webhook dispatch returned HTTP ${webhookRes.status}`);
        }
      } catch (err) {
        console.error("[Contact API] Webhook dispatch network error:", err);
      }
    }

    // Record delivery summary
    submissionRecord.deliveryStatus = {
      webhookDelivered,
      localPersisted,
      timestamp: new Date().toISOString(),
    };

    // Server-side audit log
    console.log(
      `[Contact API] Inquiry confirmed: ${referenceId} from ${submissionRecord.email} for ${submissionRecord.service} (persisted: ${localPersisted}, webhook: ${webhookDelivered})`
    );

    // Return confirmed submission
    return NextResponse.json({
      success: true,
      referenceId,
      service: submissionRecord.service,
      name: submissionRecord.name,
      receivedAt: submissionRecord.receivedAt,
      message:
        "Your consultation request has been recorded. A solutions engineer will review your specifications.",
    });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected server error occurred while processing your request. Please try again or submit an inquiry through our contact form.",
      },
      { status: 500 }
    );
  }
}
