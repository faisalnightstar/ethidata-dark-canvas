import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, CheckCircle, Users } from "lucide-react";

const jobData = {
  title: "Senior Software Engineer",
  department: "Engineering",
  location: "Remote",
  type: "Full-time",
  salary: "$150,000 - $200,000",
  deadline: "February 28, 2024",
  overview: "We're looking for a Senior Software Engineer to join our growing engineering team. You'll work on complex distributed systems, mentor junior engineers, and help shape our technical direction.",
  responsibilities: [
    "Design and implement scalable backend services and APIs",
    "Lead technical design discussions and code reviews",
    "Mentor junior engineers and foster a culture of learning",
    "Collaborate with product and design teams on new features",
    "Contribute to architectural decisions and best practices",
    "Participate in on-call rotation for production systems",
  ],
  requirements: [
    "7+ years of software engineering experience",
    "Strong proficiency in one or more: Go, Python, Node.js, or Java",
    "Experience with distributed systems and microservices",
    "Familiarity with cloud platforms (AWS, GCP, or Azure)",
    "Excellent communication and collaboration skills",
    "Bachelor's degree in Computer Science or equivalent experience",
  ],
  niceToHave: [
    "Experience with Kubernetes and containerization",
    "Background in fintech or enterprise software",
    "Open source contributions",
    "Experience with data processing pipelines",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision coverage",
    "Unlimited PTO with minimum 4 weeks encouraged",
    "Remote-first work environment",
    "$5,000 annual learning budget",
    "Home office setup allowance",
    "401(k) with company match",
    "Parental leave",
  ],
};

export default function JobDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Positions
          </Link>
          <div className="max-w-4xl">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {jobData.department}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {jobData.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {jobData.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {jobData.type}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {jobData.salary}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Apply by {jobData.deadline}
              </div>
            </div>
            <div className="mt-8">
              <GlowButton href="/apply" size="lg" icon>
                Apply for This Position
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Role</h2>
                <p className="text-muted-foreground">{jobData.overview}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">What You'll Do</h2>
                <ul className="space-y-3">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">What You'll Bring</h2>
                <ul className="space-y-3">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {jobData.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <GlassCard glow>
                <h3 className="text-lg font-semibold text-foreground mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {jobData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Have Questions?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Reach out to our recruiting team for any questions about this role.
                </p>
                <GlowButton href="/contact" variant="outline" className="w-full">
                  Contact Recruiting
                </GlowButton>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to Apply?</h2>
          <p className="mt-2 text-muted-foreground">
            We review every application and will get back to you within a week.
          </p>
          <div className="mt-6">
            <GlowButton href="/apply" size="lg" icon>
              Apply for This Position
            </GlowButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}
