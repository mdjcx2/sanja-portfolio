import { siteConfig } from "../../data/siteConfig.js";
import Button from "./Button";

export default function Footer() {
  const year = new Date().getFullYear();

  const linkGroups = [
    {
      label: "Work",
      links: [
        { name: "LinkedIn", href: siteConfig.linkedin, external: true },
        { name: "Behance",  href: siteConfig.behance,  external: true },
        { name: "Dribbble", href: siteConfig.dribbble,  external: true },
      ],
    },
    {
      label: "Process",
      links: [
        { name: "Double Diamond", href: "/process", external: false },
        { name: "AI Workflows",   href: "/process", external: false },
      ],
    },
    {
      label: "Connect",
      links: [
        { name: "Email",       href: `mailto:${siteConfig.email}`, external: false },
        { name: "Download CV", href: siteConfig.cvUrl,              external: false, download: true },
      ],
    },
  ];

  return (
    <footer className="footer-v2">

      {/* ── CTA block ─────────────────────────────────────────────────── */}
      <div className="footer-cta">
        <div className="container">
          <h2 className="footer-cta-title">
            Let's work together.
          </h2>
          <Button href={`mailto:${siteConfig.email}`} variant="primary" size="lg">
            Get in touch ↗
          </Button>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="footer-bar">
        <div className="container">
          <div className="footer-bar-inner">

            {/* Left, copyright + availability */}
            <div className="footer-bar-left">
              <p className="footer-bar-copy">© {year} {siteConfig.name}</p>
              <p className="footer-bar-tagline">Placeholder footer tagline.</p>
              <p className="footer-bar-status">
                <span className="footer-status-dot" />
                Available for freelance and full-time roles
              </p>
            </div>

            {/* Right, link groups */}
            <div className="footer-bar-groups">
              {linkGroups.map((group) => (
                <div key={group.label} className="footer-link-group">
                  <p className="footer-group-label">{group.label}</p>
                  {group.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="footer-group-link"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      download={link.download || undefined}
                    >
                      {link.name}
                      {link.external && <span className="footer-ext-arrow">↗</span>}
                    </a>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
