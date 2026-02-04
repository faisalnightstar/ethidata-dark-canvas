import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  createdAt: string;
}

interface JobsResponse {
  jobs: Job[];
  filters: {
    departments: string[];
    locations: string[];
  };
}

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<string[]>(["All"]);
  const [locations, setLocations] = useState<string[]>(["All Locations"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get<JobsResponse>('/jobs');

        if (response.success && response.data) {
          setJobs(response.data.jobs || []);
          setDepartments(["All", ...(response.data.filters?.departments || [])]);
          setLocations(["All Locations", ...(response.data.filters?.locations || [])]);
        } else {
          toast.error(response.error?.message || "Failed to load jobs. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Something went wrong while loading jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
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
                className="w-full rounded-lg border border-border bg-card pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
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
                      : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
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
                      : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-center text-muted-foreground mb-8">
            {isLoading
              ? "Loading positions..."
              : `${filteredJobs.length} position${filteredJobs.length !== 1 ? "s" : ""} found`}
          </p>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Link to={`/jobs/${job.slug}`} key={job._id}>
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
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
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

          {!isLoading && filteredJobs.length === 0 && (
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
