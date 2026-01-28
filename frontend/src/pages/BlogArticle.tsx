import { Layout } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Link2 } from "lucide-react";

const articleData = {
  title: "The Future of Cloud Architecture in 2024",
  category: "Cloud",
  author: "Marcus Chen",
  authorRole: "Chief Technology Officer",
  date: "January 15, 2024",
  readTime: "8 min read",
  content: `
    <p>Cloud architecture continues to evolve at a rapid pace, with new technologies and patterns emerging that fundamentally change how enterprises build and deploy applications.</p>

    <h2>The Rise of Multi-Cloud Strategies</h2>
    <p>Organizations are increasingly adopting multi-cloud strategies to avoid vendor lock-in, optimize costs, and leverage best-of-breed services from different providers. This trend requires new architectural patterns and tooling to manage complexity.</p>

    <h2>Edge Computing Integration</h2>
    <p>As IoT devices proliferate and latency requirements become more stringent, edge computing is becoming an integral part of cloud architecture. The challenge lies in seamlessly integrating edge and cloud resources.</p>

    <h2>AI-Driven Infrastructure</h2>
    <p>Machine learning is being applied to infrastructure management, enabling auto-scaling, predictive maintenance, and intelligent resource allocation. This shift towards AI-driven infrastructure reduces operational overhead and improves efficiency.</p>

    <h2>Sustainability Focus</h2>
    <p>Cloud providers are prioritizing sustainability, and enterprises are following suit. Green cloud strategies, carbon-aware computing, and sustainable architecture practices are becoming mainstream considerations.</p>

    <blockquote>"The cloud of 2024 is not just about infrastructure—it's about enabling intelligent, sustainable, and globally distributed applications."</blockquote>

    <h2>Looking Ahead</h2>
    <p>As we move forward, cloud architecture will continue to evolve. The key is to build flexible, adaptable systems that can leverage new technologies while maintaining stability and security.</p>
  `,
  tableOfContents: [
    "The Rise of Multi-Cloud Strategies",
    "Edge Computing Integration",
    "AI-Driven Infrastructure",
    "Sustainability Focus",
    "Looking Ahead",
  ],
};

const relatedArticles = [
  { title: "Kubernetes at Scale: Lessons Learned", category: "Engineering", date: "Jan 5, 2024" },
  { title: "Building Secure AI Systems at Scale", category: "AI & ML", date: "Jan 12, 2024" },
  { title: "Zero Trust Security Architecture", category: "Security", date: "Jan 8, 2024" },
];

export default function BlogArticle() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Article Header */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              {articleData.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {articleData.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{articleData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{articleData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{articleData.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-4">
              {/* Table of Contents - Sticky Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <GlassCard className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {articleData.tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </GlassCard>

                  {/* Share */}
                  <GlassCard className="p-4 mt-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="h-4 w-4" /> Share
                    </h3>
                    <div className="flex gap-2">
                      <a href="#" className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Link2 className="h-5 w-5" />
                      </a>
                    </div>
                  </GlassCard>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <article
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
                    prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: articleData.content }}
                />

                {/* Author Card */}
                <GlassCard className="mt-12">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold text-primary">
                      MC
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{articleData.author}</h3>
                      <p className="text-sm text-muted-foreground">{articleData.authorRole}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Marcus leads technology strategy at EthiData, bringing 20+ years of experience in enterprise architecture and cloud computing.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedArticles.map((article, index) => (
              <Link to="/blog" key={index}>
                <GlassCard className="group h-full">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{article.date}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
