export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  deliverables: string[];
  category: string;
}

export const services: Service[] = [
  {
    id: "infrastructure",
    title: "IT Infrastructure & Systems Administration",
    slug: "it-infrastructure",
    category: "Core Systems",
    description:
      "Design, deploy, and manage robust IT infrastructure that keeps your business running reliably — from servers and enterprise storage to virtualization and operating systems.",
    longDescription:
      "We plan and implement complete IT infrastructure architectures tailored to operational requirements. From bare-metal server provisioning and high-availability storage arrays to hyperconverged virtualization and automated backup workflows, we build resilient foundations engineered for high uptime.",
    icon: "Server",
    features: [
      "Server setup & enterprise provisioning",
      "Virtualization architectures (VMware & Hyper-V)",
      "Redundant storage & automated backup solutions",
      "Operating system administration (Linux & Windows)",
      "Proactive performance & resource telemetry",
    ],
    deliverables: [
      "System Architecture Blueprints",
      "Bare-Metal & Hypervisor Provisioning",
      "Automated Disaster Recovery Runbooks",
      "24/7 Health Monitoring Instrumentation",
    ],
  },
  {
    id: "networking",
    title: "Enterprise Networking Solutions",
    slug: "networking",
    category: "Connectivity",
    description:
      "Build fast, secure, and resilient business networks — from structured copper/fiber cabling and managed switching to enterprise Wi-Fi, VPNs, and next-generation firewalls.",
    longDescription:
      "From initial network topology design to full physical deployment and ongoing management, we deliver enterprise networking solutions that ensure ultra-low latency, appropriate VLAN segmentation, and ironclad perimeter security boundaries for growing commercial environments.",
    icon: "Network",
    features: [
      "LAN/WAN topology design & implementation",
      "Structured copper & fiber optic cabling",
      "High-density enterprise Wi-Fi deployment",
      "Next-generation firewall & router configuration",
      "Secure site-to-site & client VPN management",
    ],
    deliverables: [
      "Network Topology & Traffic Maps",
      "Hardware Installation & Rack Dressing",
      "VLAN & Security Policy Configurations",
      "Wireless Coverage Heatmaps & Certification",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Solutions & AWS Architecture",
    slug: "cloud-solutions",
    category: "Cloud & DevOps",
    description:
      "Migrate legacy workloads, architect scalable cloud-native environments, and optimize infrastructure costs using AWS and leading cloud platforms.",
    longDescription:
      "We help organizations transition to the cloud with precision — architecting environments that balance raw performance, elasticity, and operational cost. Whether you are executing a hybrid migration or building serverless cloud-native applications, we lead every phase from audit to cutover.",
    icon: "Cloud",
    features: [
      "AWS architecture, VPC design & multi-AZ deployment",
      "Zero-downtime cloud migration strategies",
      "FinOps & cloud cost optimization reviews",
      "Infrastructure as Code (Terraform & CloudFormation)",
      "Cloud security hardening & compliance auditing",
    ],
    deliverables: [
      "Cloud Readiness & TCO Assessment",
      "Infrastructure as Code Modules",
      "Secure VPC & IAM Configuration",
      "Automated Backup & Failover Verification",
    ],
  },
  {
    id: "odoo",
    title: "Odoo ERP Implementation & Customization",
    slug: "odoo-erp",
    category: "Business Software",
    description:
      "Implement and customize Odoo ERP to unify operations — covering accounting, inventory, CRM, HR, point-of-sale, and manufacturing workflows.",
    longDescription:
      "Odoo is a versatile enterprise platform that can modernize business operations. We provide end-to-end implementation: process mapping, module configuration, Python module development, legacy database migration, and structured staff onboarding to ensure lasting operational adoption.",
    icon: "LayoutGrid",
    features: [
      "Comprehensive Odoo deployment & configuration",
      "Custom module & workflow engineering in Python",
      "Automated legacy data migration & validation",
      "Third-party payment & shipping API integrations",
      "End-user training & dedicated ongoing maintenance",
    ],
    deliverables: [
      "Business Workflow Specification",
      "Configured Odoo Community / Enterprise Setup",
      "Validated Data Migration Scripts",
      "Custom Module Repositories & User Manuals",
    ],
  },
  {
    id: "web-development",
    title: "Web Engineering & Digital Solutions",
    slug: "web-development",
    category: "Software Engineering",
    description:
      "Engineer bespoke web applications, high-performance corporate platforms, and client portals built for velocity, accessibility, and scalability.",
    longDescription:
      "From high-conversion corporate web platforms to secure authenticated client portals and bespoke internal dashboards, we build full-stack web applications that are meticulously engineered, fully responsive, and closely aligned with organizational objectives.",
    icon: "Code2",
    features: [
      "Modern corporate websites & web applications",
      "Secure client portals & administrative dashboards",
      "Robust REST & GraphQL API engineering",
      "Core Web Vitals & performance optimization",
      "Full responsiveness & accessibility compliance",
    ],
    deliverables: [
      "Production-Ready Application Codebases",
      "Responsive UI Design & Component System",
      "API Documentation & Integration Specs",
      "Automated CI/CD Deployment Pipelines",
    ],
  },
  {
    id: "support",
    title: "IT Support & Managed Maintenance",
    slug: "it-support",
    category: "Managed Services",
    description:
      "Rapid-response technical support and proactive maintenance to prevent downtime, resolve incidents, and preserve system health.",
    longDescription:
      "We provide structured IT support that maintains team velocity. From rapid helpdesk triage and workstation device management to continuous patch administration, endpoint antivirus, and proactive server health monitoring, we eliminate operational technology friction.",
    icon: "HeadphonesIcon",
    features: [
      "Responsive helpdesk & technical ticketing",
      "Workstation fleet management & onboarding",
      "OS & security patch orchestration",
      "Proactive telemetry & health monitoring",
      "Scheduled preventative maintenance visits",
    ],
    deliverables: [
      "Operational Response Protocol",
      "Automated Patching & Endpoint Reports",
      "Monthly Incident & Performance Reviews",
      "Standard Operating Procedures (SOP) Manual",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Threat Hardening",
    slug: "cybersecurity",
    category: "Security & Governance",
    description:
      "Safeguard critical business data through multi-layered defense — covering vulnerability assessments, endpoint detection, IAM controls, and staff training.",
    longDescription:
      "Cybersecurity requires continuous engineering and cultural vigilance. We help organizations assess risk exposure, enforce least-privilege security policies, harden external and internal perimeters, and foster practical security awareness across all departments.",
    icon: "ShieldCheck",
    features: [
      "Network & infrastructure vulnerability audits",
      "Next-gen endpoint detection & response (EDR)",
      "Identity & Access Management (IAM & MFA)",
      "Secure email gateway & anti-phishing safeguards",
      "Staff security hygiene & awareness workshops",
    ],
    deliverables: [
      "Comprehensive Threat & Gap Assessment",
      "Hardened Baseline Configuration Profiles",
      "MFA & Access Policy Architecture",
      "Incident Response & Containment Playbook",
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
