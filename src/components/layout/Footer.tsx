import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Youtube } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "All Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Products", href: "/products" },
    { name: "Pricing", href: "/pricing" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Resources", href: "/resources" },
    { name: "Events", href: "/events" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Partnerships", href: "/partnerships" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ethidata-and-technologies/", icon: Linkedin },
  { name: "Twitter", href: "https://x.com/ethidata", icon: Twitter },
  { name: "GitHub", href: "https://github.com/ethidata", icon: Github },
  { name: "YouTube", href: "https://www.youtube.com/@ethidata", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card">
      {/* Main Footer */}
      <div className="container-custom py-16 text-center md:text-left">
        <div className="flex gap-12 flex-wrap justify-center md:flex-nowrap text-left md:text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2 ">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text">ETHI</span>
                <span className="text-foreground">DATA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Empowering enterprises with cutting-edge technology solutions.
              Building the future, one innovation at a time.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:abufaisal@ethicodes.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                abufaisal@ethicodes.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                +91 82859-61002
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Greater Noida, India
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow-sm"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Stay Updated
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get the latest news and insights delivered to your inbox.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-glow rounded-lg px-6 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col gap-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© 2024 EthiData & Technologies. All rights reserved.</p>
          <div className="flex justify-center gap-6 sm:justify-start">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
