import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "http://localhost:3005";

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch {}
          resolve({ status: res.statusCode, headers: res.headers, text: data, json });
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

test("Production Site Navigation & Routes", async (t) => {
  const routes = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/contact",
    "/privacy",
    "/terms",
    "/services/it-infrastructure",
    "/services/networking",
    "/services/cloud-solutions",
    "/services/odoo-erp",
    "/services/web-development",
    "/services/it-support",
    "/services/cybersecurity",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const route of routes) {
    await t.test(`Route ${route} should return HTTP 200`, async () => {
      const res = await request(route);
      assert.equal(res.status, 200, `Expected 200 for ${route}, got ${res.status}`);
      assert.ok(res.text.length > 50, `Expected content for ${route}`);
    });
  }

  await t.test("Invalid route should return HTTP 404 with custom error page", async () => {
    const res = await request("/this-page-does-not-exist-test-404");
    assert.equal(res.status, 404);
    assert.ok(res.text.includes("The requested system path does not exist"));
  });
});

test("Contact & Consultation API Flow", async (t) => {
  await t.test("Reject empty payload with status 422 and validation field errors", async () => {
    const res = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {},
    });
    assert.equal(res.status, 422);
    assert.equal(res.json?.success, false);
    assert.ok(res.json?.details?.name);
    assert.ok(res.json?.details?.email);
    assert.ok(res.json?.details?.service);
    assert.ok(res.json?.details?.message);
  });

  await t.test("Reject invalid email format with status 422", async () => {
    const res = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name: "Test Engineer",
        email: "invalid-email-address",
        service: "Enterprise Networking Solutions",
        message: "Need consulting on enterprise routing.",
      },
    });
    assert.equal(res.status, 422);
    assert.ok(res.json?.details?.email);
  });

  await t.test("Trap honeypot bot submissions without error", async () => {
    const res = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name: "Spam Bot",
        email: "bot@spammer.org",
        service: "Enterprise Networking Solutions",
        message: "Spam content message here.",
        website: "https://spamlink.xyz",
      },
    });
    assert.equal(res.status, 200);
    assert.equal(res.json?.success, true);
    assert.ok(res.json?.referenceId);
  });

  await t.test("Trap rapid bot submission submitted under 800ms", async () => {
    const res = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name: "Fast Bot Submitter",
        email: "fast@automation.com",
        service: "Enterprise Networking Solutions",
        message: "Quickly populated spam form submission.",
        renderedAt: Date.now(),
      },
    });
    assert.equal(res.status, 400);
    assert.equal(res.json?.success, false);
  });

  let savedReferenceId = "";

  await t.test("Accept and durably persist valid consultation request with reference ID", async () => {
    const res = await request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.99",
      },
      body: {
        name: "DevOps Architect",
        email: "architect@tech-firm.com",
        company: "Apex Technology Partners",
        service: "Cloud Solutions & AWS Architecture",
        message: "We need architectural guidance for zero-downtime multi-region AWS migration.",
        renderedAt: Date.now() - 4000,
      },
    });
    assert.equal(res.status, 200);
    assert.equal(res.json?.success, true);
    assert.ok(res.json?.referenceId?.startsWith("AC-"));
    assert.equal(res.json?.service, "Cloud Solutions & AWS Architecture");
    savedReferenceId = res.json.referenceId;
  });

  await t.test("Verify enquiry actually exists in local durable storage file", async () => {
    const storagePath = path.join(process.cwd(), ".data", "enquiries.jsonl");
    const raw = await fs.readFile(storagePath, "utf8");
    assert.ok(raw.includes(savedReferenceId), "Persisted file must contain the generated reference ID");
    assert.ok(raw.includes("architect@tech-firm.com"), "Persisted file must contain submitted email");
    assert.ok(raw.includes("Apex Technology Partners"), "Persisted file must contain submitted company");
  });

  await t.test("Reject GET request with HTTP 405 Method Not Allowed", async () => {
    const res = await request("/api/contact", { method: "GET" });
    assert.equal(res.status, 405);
  });
});

test("Metadata, SEO & Schema Health", async (t) => {
  const res = await request("/");
  assert.equal(res.status, 200);

  await t.test("Contains verified viewport meta tag", () => {
    assert.ok(res.text.includes("name=\"viewport\"") || res.text.includes("viewport"));
  });

  await t.test("Contains canonical URL link", () => {
    assert.ok(res.text.includes("https://autocratic.in"));
  });

  await t.test("Contains JSON-LD Structured Data for Autocratic", () => {
    assert.ok(res.text.includes("application/ld+json"));
    assert.ok(res.text.includes("https://autocratic.in/#organization"));
  });

  await t.test("Contains theme persistence script", () => {
    assert.ok(res.text.includes("autocratic-theme"));
  });
});
