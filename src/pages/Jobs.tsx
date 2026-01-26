import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, JobCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";

const departments = ["All", "Engineering", "Design", "AI & ML", "DevOps", "Sales", "Operations"];
const locations = ["All Locations", "Remote", "San Francisco, CA", "New York, NY", "London, UK", "Singapore"];

const jobs = [
  { title: "Senior Software Engineer", department: "Engineering", location: "Remote", type: "Full-time", deadline: "Feb 28, 2024" },
  { title: "Cloud Architect", department: "Engineering", location: "San Francisco, CA", type: "Full-time", deadline: "Mar 15, 2024" },
  { title: "Product Designer", department: "Design", location: "Remote", type: "Full-time", deadline: "Mar 1, 2024" },
  { title: "Data Scientist", department: "AI & ML", location: "Remote", type: "Full-time", deadline: "Mar 10, 2024" },
  { title: "DevOps Engineer", department: "DevOps", location: "New York, NY", type: "Full-time", deadline: "Feb 25, 2024" },
  { title: "ML Engineer", department: "AI & ML", location: "Remote", type: "Full-time", deadline: "Mar 20, 2024" },
  { title: "UX Researcher", department: "Design", location: "San Francisco, CA", type: "Full-time", deadline: "Mar 5, 2024" },
  { title: "Account Executive", department: "Sales", location: "New York, NY", type: "Full-time", deadline: "Feb 20, 2024" },
  { title: "Site Reliability Engineer", department: "DevOps", location: "Remote", type: "Full-time", deadline: "Mar 12, 2024" },
  { title: "Frontend Engineer", department: "Engineering", location: "London, UK", type: "Full-time", deadline: "Mar 8, 2024" },
  { title: "Operations Manager", department: "Operations", location: "Singapore", type: "Full-time", deadline: "Mar 15, 2024" },
  { title: "Backend Engineer", department: "Engineering", location: "Remote", type: "Full-time", deadline: "Mar 1, 2024" },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = activeDepartment === "All" || job.department === activeDepartment;
    const matchesLocation = activeLocation === "All Locations" || job.location === activeLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesLocation && matchesSearch;
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="Open Positions"
        title="Join Our Team"
        description="Find your next role and help us build technology that makes a difference."
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Search */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
                <Briefcase className="h-4 w-4" />
                Department:
              </span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    activeDepartment === dept
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                      : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Location Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
                <MapPin className="h-4 w-4" />
                Location:
              </span>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setActiveLocation(loc)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    activeLocation === loc
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-center text-muted-foreground mb-8">
            {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
          </p>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <Link to={`/jobs/${job.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <GlassCard className="group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        Apply by {job.deadline}
                      </span>
                      <div className="btn-glow rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
                        Apply
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No positions match your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Don't See the Right Role?"
        description="We're always looking for talented people. Send us your resume."
        primaryAction={{ label: "Submit Your Resume", href: "/contact" }}
        secondaryAction={{ label: "Learn About Our Culture", href: "/careers" }}
      />
    </Layout>
  );
}
