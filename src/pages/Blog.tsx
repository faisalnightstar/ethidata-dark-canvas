import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, BlogCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const categories = ["All", "Engineering", "Cloud", "AI & ML", "Security", "DevOps", "Culture"];

const blogPosts = [
  {
    title: "The Future of Cloud Architecture in 2024",
    excerpt: "Explore emerging trends in cloud computing and how they'll shape enterprise infrastructure.",
    category: "Cloud",
    date: "Jan 15, 2024",
    featured: true,
  },
  {
    title: "Building Secure AI Systems at Scale",
    excerpt: "Best practices for implementing AI systems with security and compliance in mind.",
    category: "AI & ML",
    date: "Jan 12, 2024",
  },
  {
    title: "DevOps Best Practices for Enterprise",
    excerpt: "How to implement DevOps practices that scale across large organizations.",
    category: "DevOps",
    date: "Jan 10, 2024",
  },
  {
    title: "Zero Trust Security Architecture",
    excerpt: "Why zero trust is the future of enterprise security and how to implement it.",
    category: "Security",
    date: "Jan 8, 2024",
  },
  {
    title: "Kubernetes at Scale: Lessons Learned",
    excerpt: "Real-world lessons from running Kubernetes in production for Fortune 500 companies.",
    category: "Engineering",
    date: "Jan 5, 2024",
  },
  {
    title: "Building a Culture of Innovation",
    excerpt: "How we foster innovation and continuous learning at EthiData.",
    category: "Culture",
    date: "Jan 3, 2024",
  },
];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeFilter === "All" || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <Layout>
      <PageHeader
        eyebrow="Blog"
        title="Insights & Innovation"
        description="Thoughts, ideas, and insights from the EthiData team on technology, engineering, and innovation."
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container-custom">
            <Link to={`/blog/${featuredPost.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <GlassCard className="p-0 overflow-hidden group" glow>
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      Featured • {featuredPost.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold text-foreground lg:text-3xl group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{featuredPost.excerpt}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{featuredPost.date}</p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === category
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                    : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.filter(p => !p.featured).map((post, index) => (
              <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <BlogCard {...post} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Subscribe to Our Newsletter"
        description="Get the latest insights delivered straight to your inbox."
        primaryAction={{ label: "Subscribe Now", href: "/contact" }}
      />
    </Layout>
  );
}
