export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  clientType: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  status: "illustrative";
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: "network-overhaul",
    slug: "network-overhaul",
    title: "Enterprise Multi-Floor Network Infrastructure",
    category: "Networking & Security",
    year: "2025",
    clientType: "Commercial Real Estate & HQ",
    description:
      "A complete physical and logical network redesign for a multi-floor commercial headquarters — featuring structured Cat6A/fiber backbone, managed 10GbE switching, high-density Wi-Fi 6 coverage, and redundant firewall perimeter failover.",
    challenge:
      "A growing enterprise was suffering from severe Wi-Fi dead zones, unsegmented traffic causing multicast saturation, and single-point-of-failure routing vulnerabilities across three office floors.",
    solution:
      "Architected a centralized IDF/MDF rack infrastructure with redundant 10GbE fiber interconnects, segmented isolated VLANs for corporate devices, IoT, and guests, and deployed managed access points with centralized controller telemetry.",
    tags: ["LAN/WAN", "Firewall", "Wi-Fi 6", "Structured Cabling", "VLAN Segmentation"],
    status: "illustrative",
    metrics: [
      { label: "Coverage", value: "100% Floor Area" },
      { label: "Throughput", value: "10 Gbps Backbone" },
      { label: "Failover", value: "Sub-Second Automatic" },
    ],
  },
  {
    id: "odoo-retail",
    slug: "odoo-retail",
    title: "Omnichannel Odoo ERP Modernization",
    category: "Business Systems",
    year: "2025",
    clientType: "Multi-Location Retail Operations",
    description:
      "An end-to-end Odoo ERP implementation connecting multi-warehouse inventory, point-of-sale terminals, automated procurement rules, and real-time ledger accounting into a single unified operating platform.",
    challenge:
      "Disparate legacy software resulted in frequent inventory discrepancies, manual re-entry errors between POS and back-office accounting, and inability to forecast inventory stockouts reliably.",
    solution:
      "Configured Odoo Enterprise with automated reordering routes, multi-currency accounting reconciliations, barcode scanning for fulfillment staff, and live POS offline-sync capability across branches.",
    tags: ["Odoo ERP", "Multi-Location POS", "Inventory Management", "Automated Accounting"],
    status: "illustrative",
    metrics: [
      { label: "Sync Speed", value: "Real-Time Telemetry" },
      { label: "Accuracy", value: "99.8% Inventory Precision" },
      { label: "Order Time", value: "70% Faster Fulfillment" },
    ],
  },
  {
    id: "aws-cloud-migration",
    slug: "aws-cloud-migration",
    title: "Zero-Downtime AWS Cloud Migration",
    category: "Cloud Architecture",
    year: "2024",
    clientType: "Financial Services Provider",
    description:
      "Phased lift-and-shape migration of mission-critical on-premises systems into Amazon Web Services — leveraging Multi-AZ RDS, autoscaled EC2, encrypted S3 buckets, and Infrastructure as Code.",
    challenge:
      "Aging on-premise hardware posed escalating reliability risks, high maintenance capital expense, and insufficient disaster recovery resilience under strict regulatory compliance rules.",
    solution:
      "Built a terraform-managed Multi-AZ AWS architecture with KMS encryption, automated database snapshots, Elastic Load Balancing, and an automated cutover runbook executed over a planned off-hours maintenance window.",
    tags: ["AWS Cloud", "Terraform IaC", "Amazon RDS", "VPC Security", "Disaster Recovery"],
    status: "illustrative",
    metrics: [
      { label: "Availability", value: "99.99% Multi-AZ SLA" },
      { label: "Downtime During Cutover", value: "0 Minutes Unplanned" },
      { label: "OpEx Savings", value: "32% Projected TCO" },
    ],
  },
  {
    id: "business-website",
    slug: "business-website",
    title: "Secure Client Document Portal & Web Platform",
    category: "Web Engineering",
    year: "2025",
    clientType: "Professional Advisory Services",
    description:
      "A bespoke corporate web application paired with an encrypted, authenticated client portal for frictionless document exchanges, project status timelines, and stakeholder messaging.",
    challenge:
      "Client files were being shared over insecure email attachments without audit trails, and the legacy corporate site was slow, non-responsive, and difficult to manage.",
    solution:
      "Engineered a modern Next.js and TypeScript application with role-based access control (RBAC), end-to-end encrypted document storage, responsive editorial aesthetics, and Sub-second Core Web Vitals.",
    tags: ["Next.js", "TypeScript", "Client Portal", "Role-Based Access", "Performance"],
    status: "illustrative",
    metrics: [
      { label: "Lighthouse Score", value: "98/100 Performance" },
      { label: "Security", value: "Encrypted at Rest & Transit" },
      { label: "Adoption Rate", value: "94% Active Engagement" },
    ],
  },
  {
    id: "server-infrastructure",
    slug: "server-infrastructure",
    title: "Data Center Server Consolidation & Virtualization",
    category: "Infrastructure",
    year: "2024",
    clientType: "Industrial Logistics & Supply",
    description:
      "Consolidation of eight legacy physical servers into a high-density, redundant VMware vSphere virtual cluster with SAN shared storage and automated snapshot replication.",
    challenge:
      "Server rack sprawl, excessive power consumption, lack of hardware redundancies, and multiple unsupported legacy operating systems nearing end-of-life.",
    solution:
      "Specified enterprise dual-socket host nodes, configured redundant 10Gb iSCSI SAN connections, migrated physical workloads via P2V imaging, and implemented daily offsite immutable backup retention.",
    tags: ["VMware vSphere", "SAN Storage", "Server Consolidation", "P2V Migration"],
    status: "illustrative",
    metrics: [
      { label: "Hardware Footprint", value: "75% Reduction" },
      { label: "Power & Cooling", value: "60% Lower Consumption" },
      { label: "Recovery Time", value: "Minutes vs. Days" },
    ],
  },
  {
    id: "security-hardening",
    slug: "security-hardening",
    title: "Enterprise Cybersecurity Audit & Perimeter Hardening",
    category: "Cybersecurity",
    year: "2025",
    clientType: "Healthcare Technology Group",
    description:
      "A rigorous multi-vector vulnerability audit across external attack surfaces, internal Active Directory domains, and endpoint fleets, followed by prioritized remediations and zero-trust controls.",
    challenge:
      "Increasing exposure to sophisticated phishing campaigns, unpatched endpoint vulnerabilities, and insufficient multi-factor authentication enforcement across remote workers.",
    solution:
      "Conducted comprehensive vulnerability scanning and credential audits, rolled out unified EDR threat agents, enforced universal hardware-token MFA, and enacted automated patch compliance schedules.",
    tags: ["Cybersecurity", "Zero-Trust", "EDR Protection", "Active Directory", "MFA"],
    status: "illustrative",
    metrics: [
      { label: "Vulnerabilities Remediated", value: "100% Critical/High" },
      { label: "MFA Coverage", value: "100% Enforced" },
      { label: "Endpoint Compliance", value: "Real-Time Telemetry" },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug || p.id === slug);
