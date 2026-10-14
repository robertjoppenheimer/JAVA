import fs from "fs/promises";
import path from "path";

export interface ConsultationRecord {
  referenceId: string;
  receivedAt: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  clientIp?: string;
  deliveryStatus?: {
    webhookDelivered: boolean;
    localPersisted: boolean;
    timestamp: string;
  };
}

/**
 * Resolves the absolute path for local durable storage in a static manner friendly to Turbopack tracer.
 *
 * NOTE ON SERVERLESS (VERCEL):
 * In Vercel serverless functions, process.env.VERCEL is set and storage defaults to /tmp.
 * However, /tmp is ephemeral and limited to the life of an individual serverless execution container;
 * it does NOT survive cold starts, multi-region container recycling, or redeployments.
 * For reliable durable delivery in production on Vercel, set CONTACT_WEBHOOK_URL to forward
 * enquiries to an external endpoint (Slack, Discord, Zapier, Make, or custom CRM webhook).
 */
function getStorageFilePath(): string {
  if (process.env.STORAGE_FILE_PATH) {
    return process.env.STORAGE_FILE_PATH;
  }
  if (process.env.VERCEL) {
    if (!process.env.CONTACT_WEBHOOK_URL) {
      console.warn(
        "[Enquiry Storage Warning] Running on Vercel serverless using ephemeral /tmp storage without CONTACT_WEBHOOK_URL configured. Enquiries in /tmp will not survive container recycling. Configure CONTACT_WEBHOOK_URL for reliable production delivery."
      );
    }
    return path.join("/tmp", "autocratic-enquiries.jsonl");
  }
  return path.join(process.cwd(), ".data", "enquiries.jsonl");
}

/**
 * Persists an enquiry record to append-only JSONL durable storage.
 * Ensures the target directory exists and write is flushed.
 */
export async function persistEnquiry(record: ConsultationRecord): Promise<boolean> {
  try {
    const targetPath = getStorageFilePath();
    const dir = path.dirname(targetPath);
    await fs.mkdir(dir, { recursive: true });

    const line = JSON.stringify(record) + "\n";
    await fs.appendFile(targetPath, line, "utf8");
    return true;
  } catch (err) {
    console.error("[Enquiry Storage] Failed to persist enquiry:", err);
    return false;
  }
}

/**
 * Reads all persisted enquiries (useful for testing, automated audits, or local verification).
 */
export async function getPersistedEnquiries(): Promise<ConsultationRecord[]> {
  try {
    const targetPath = getStorageFilePath();
    // Turbopack ignore annotation to avoid tracing entire root
    const raw = await fs.readFile(/* turbopackIgnore: true */ targetPath, "utf8");
    const lines = raw.split("\n").filter((l) => l.trim().length > 0);
    return lines.map((l) => JSON.parse(l) as ConsultationRecord);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "ENOENT") {
      return [];
    }
    console.error("[Enquiry Storage] Error reading enquiries:", err);
    return [];
  }
}
