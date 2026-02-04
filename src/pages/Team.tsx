import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, TeamCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Linkedin, Twitter, Mail } from "lucide-react";

const departments = ["All", "Leadership", "Engineering", "Design", "Operations", "Sales"];

const teamMembers = [{
  name: "Atharv Chaturvedi",
  role: "Chief Executive Officer",
  department: "Leadership",
  bio: "Atharv oversees the strategic direction and operational leadership of EthiData & Technologies. With experience driving digital-first initiatives and delivering organizational scale, he focuses on product strategy, business growth, and building high-performance teams. His leadership centers on disciplined execution, customer-centric innovation, and long-term enterprise value creation.",
  quote: "Strong companies are built on disciplined leadership, clear vision, and the ability to execute with intent.",
  image: "/images/teams/atharv.png",
  linkedin: "https://www.linkedin.com/in/atharv-chaturvedi-34b501299/",
  x: "https://x.com",
  mail: "atharv@ethicodes.com"
},
{
  name: "Abu Faisal",
  role: "Director & Chief Technology Officer",
  department: "Leadership",
  bio: "Faisal is a technology strategist with deep expertise in engineering high-performance digital systems. As the co-founder of EthiData & Technologies, he has led mission-critical architecture decisions, scaled infrastructure, and driven innovation across web, mobile, and cloud ecosystems. His focus is on operational excellence, product velocity, and building resilient technology foundations that enable business growth.",
  quote: "Technology is not built on guesswork. It’s built on clarity, precision, and uncompromising execution.",
  image: "/images/teams/faisal.jpeg",
  linkedin: "https://www.linkedin.com/in/faisalnightstar/",
  x: "https://x.com/abufaisal_dev",
  mail: "mailto:abufaisal@ethicodes.com"
},

{ name: "Saif Farhan", role: "Chief Operations Officer", department: "Leadership", image: "/images/teams/farhan.png" },
{ name: "Kartikey Chaturvedi", role: "VP of Engineering", department: "Leadership", image: "/images/teams/kartikey.png" },
{ name: "Saif Farhan", role: "VP of Sales", department: "Sales" },
{ name: "Michael Torres", role: "Head of Design", department: "Design" },
{ name: "Emily Watson", role: "Principal Engineer", department: "Engineering" },
{ name: "Aliya Tabassum", role: "Senior Engineer", department: "Engineering", image: "/images/teams/aliya.jpeg" },
{ name: "Lisa Chang", role: "Senior Designer", department: "Design" },
{ name: "Robert Kim", role: "DevOps Lead", department: "Engineering" },
{ name: "Amanda Foster", role: "Operations Manager", department: "Operations" },
{ name: "Chris Anderson", role: "Account Executive", department: "Sales" },
];

const leadershipSpotlights = [
  {
    name: "Abu Faisal",
    role: "Director & Chief Technology Officer",
    bio: "Faisal is a technology strategist with deep expertise in engineering high-performance digital systems. As the co-founder of EthiData & Technologies, he has led mission-critical architecture decisions, scaled infrastructure, and driven innovation across web, mobile, and cloud ecosystems. His focus is on operational excellence, product velocity, and building resilient technology foundations that enable business growth.",
    quote: "Technology is not built on guesswork. It’s built on clarity, precision, and uncompromising execution.",
    image: "/images/teams/faisal.jpeg",
    linkedin: "https://www.linkedin.com/in/faisalnightstar/",
    x: "https://x.com/abufaisal_dev",
    mail: "mailto:abufaisal@ethicodes.com"
  },
  {
    name: "Atharv Chaturvedi",
    role: "Chief Executive Officer",
    bio: "Atharv oversees the strategic direction and operational leadership of EthiData & Technologies. With experience driving digital-first initiatives and delivering organizational scale, he focuses on product strategy, business growth, and building high-performance teams. His leadership centers on disciplined execution, customer-centric innovation, and long-term enterprise value creation.",
    quote: "Strong companies are built on disciplined leadership, clear vision, and the ability to execute with intent.",
    image: "/images/teams/atharv.png",
    linkedin: "https://www.linkedin.com/in/atharv-chaturvedi-34b501299/",
    x: "https://x.com",
    mail: "atharv@ethicodes.com"
  }
];

export default function Team() {
  const [activeFilter, setActiveFilter] = useState("All");
  console.log("team member", teamMembers[0].image)

  const filteredMembers = activeFilter === "All"
    ? teamMembers
    : teamMembers.filter(member => member.department === activeFilter);

  return (
    <Layout>
      <PageHeader
        eyebrow="Our Team"
        title="The People Behind EthiData"
        description="Meet the talented individuals who make innovation happen every day."
      />

      {/* Leadership Spotlight */}
      <section className="section-padding border-b border-white/10">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Leadership Spotlight"
            title="Guided by Vision"
          />
          {leadershipSpotlights.map((leadershipSpotlight, index) => {
            return (
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center" key={index}>
                <GlassCard className="p-0 overflow-hidden" glow>
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <img
                      src={leadershipSpotlight.image}
                      alt={leadershipSpotlight.name}
                      className="text-8xl font-bold gradient-text"
                    />
                  </div>
                </GlassCard>

                <div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {leadershipSpotlight.name}
                  </h3>

                  <p className="mt-2 text-lg text-primary">
                    {leadershipSpotlight.role}
                  </p>

                  <p className="mt-6 text-muted-foreground">
                    {leadershipSpotlight.bio}
                  </p>

                  <blockquote className="mt-6 border-l-2 border-primary pl-4 italic text-muted-foreground">
                    "{leadershipSpotlight.quote}"
                  </blockquote>

                  <div className="mt-6 flex gap-4">
                    <a href={leadershipSpotlight.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={leadershipSpotlight.x} className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={leadershipSpotlight.mail} className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Full Team"
            title="Meet Everyone"
            description="Our diverse team brings together expertise from across the technology landscape."
          />

          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === dept
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                    : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMembers.map((member, index) => (
              <div key={index} className="group">
                <GlassCard className="relative overflow-hidden">
                  <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20 transition-all group-hover:border-primary/50 group-hover:shadow-glow-sm">
                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-primary">

                      <img src={member?.image} alt={member.name.split(' ').map(n => n[0]).join('')} />

                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {member.department}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
                    <a href={member.linkedin} className="rounded-full bg-white/10 p-2 hover:bg-primary/20 hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.x} className="rounded-full bg-white/10 p-2 hover:bg-primary/20 hover:text-primary">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={member.mail} className="rounded-full bg-white/10 p-2 hover:bg-primary/20 hover:text-primary">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Want to Join Our Team?"
        description="We're always looking for talented individuals who share our passion for innovation."
        primaryAction={{ label: "View Open Positions", href: "/jobs" }}
        secondaryAction={{ label: "Learn About Our Culture", href: "/careers" }}
      />
    </Layout>
  );
}
