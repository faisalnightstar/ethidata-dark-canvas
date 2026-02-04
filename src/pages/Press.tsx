import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Download, ExternalLink, Calendar, ArrowRight } from "lucide-react";

const pressReleases = [
  {
    title: "EthiData Raises $50M Series C to Accelerate Enterprise AI Solutions",
    date: "January 10, 2024",
    excerpt: "Funding will support expansion of AI capabilities and global growth.",
  },
  {
    title: "EthiData Named a Leader in Gartner Magic Quadrant for Cloud Services",
    date: "December 5, 2023",
    excerpt: "Recognition for completeness of vision and ability to execute.",
  },
  {
    title: "EthiData Launches SecureGuard Enterprise Security Platform",
    date: "November 15, 2023",
    excerpt: "New comprehensive security solution for enterprise organizations.",
  },
  {
    title: "EthiData Opens New Office in Bangalore, IN",
    date: "October 20, 2023",
    excerpt: "Expansion to serve growing demand in Asia-Pacific region.",
  },
];

const inTheNews = [
  {
    title: "How EthiData is Shaping the Future of Enterprise AI",
    publication: "TechCrunch",
    date: "January 8, 2024",
    link: "#",
  },
  {
    title: "The Rise of Ethical Technology Companies",
    publication: "Forbes",
    date: "December 12, 2023",
    link: "#",
  },
  {
    title: "Cloud Migration Success Stories: EthiData's Approach",
    publication: "CIO Magazine",
    date: "November 28, 2023",
    link: "#",
  },
  {
    title: "Interview: Alexandra Reynolds on Leadership in Tech",
    publication: "Harvard Business Review",
    date: "October 15, 2023",
    link: "#",
  },
];

const mediaKit = [
  { name: "Logo Pack", format: "ZIP", size: "2.5 MB" },
  { name: "Brand Guidelines", format: "PDF", size: "8.2 MB" },
  { name: "Executive Photos", format: "ZIP", size: "15 MB" },
  { name: "Fact Sheet", format: "PDF", size: "1.1 MB" },
];

export default function Press() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Press & Media"
        title="Newsroom"
        description="The latest news, press releases, and media resources from EthiData."
      />

      {/* Press Releases */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Press Releases"
            title="Latest Announcements"
          />
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <GlassCard key={index} className="group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{release.excerpt}</p>
                  </div>
                  <GlowButton variant="outline" className="self-start" icon>
                    Read More
                  </GlowButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* In The News */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Coverage"
            title="In The News"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {inTheNews.map((article, index) => (
              <a href={article.link} key={index}>
                <GlassCard className="group h-full">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {article.publication}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Media Kit"
            title="Press Resources"
            description="Download logos, brand guidelines, and other media assets."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mediaKit.map((item, index) => (
              <GlassCard key={index} className="group text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.format} • {item.size}
                </p>
                <button className="mt-4 text-sm text-primary hover:underline">
                  Download
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <GlassCard className="text-center p-12" glow>
            <h2 className="text-2xl font-bold text-foreground">Press Inquiries</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              For media inquiries, interviews, or additional information, please contact our press team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:press@ethidata.com" className="text-lg text-primary hover:underline">
                press@ethidata.com
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <span className="text-lg text-muted-foreground">+91-8285961002</span>
            </div>
          </GlassCard>
        </div>
      </section>

      <CTABanner
        title="Want to Feature EthiData?"
        description="We're happy to provide quotes, insights, and expert commentary."
        primaryAction={{ label: "Contact Press Team", href: "/contact" }}
      />
    </Layout>
  );
}
