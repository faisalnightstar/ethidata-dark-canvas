import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Calendar, MapPin, Clock, Video, Users, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    title: "The Future of Enterprise AI",
    type: "Webinar",
    date: "Feb 15, 2024",
    time: "2:00 PM EST",
    description: "Join our CTO for an in-depth discussion on AI trends shaping enterprise technology.",
    speakers: ["Marcus Chen", "Dr. Sarah Williams"],
    virtual: true,
  },
  {
    title: "Cloud Architecture Summit 2024",
    type: "Conference",
    date: "Mar 20-22, 2024",
    time: "9:00 AM - 5:00 PM",
    description: "Our annual conference bringing together cloud architects and engineers.",
    location: "Greater Noida, IN",
    virtual: false,
  },
  {
    title: "Security Best Practices Workshop",
    type: "Workshop",
    date: "Apr 5, 2024",
    time: "10:00 AM EST",
    description: "Hands-on workshop covering enterprise security implementation.",
    speakers: ["Emily Watson"],
    virtual: true,
  },
];

const pastEvents = [
  {
    title: "DevOps Transformation Masterclass",
    type: "Webinar",
    date: "Jan 10, 2024",
    recording: true,
  },
  {
    title: "Data Strategy Workshop",
    type: "Workshop",
    date: "Dec 15, 2023",
    recording: true,
  },
  {
    title: "EthiData Tech Summit 2023",
    type: "Conference",
    date: "Nov 8-10, 2023",
    recording: true,
  },
  {
    title: "Kubernetes Deep Dive",
    type: "Webinar",
    date: "Oct 20, 2023",
    recording: true,
  },
];

export default function Events() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Events & Webinars"
        title="Learn From the Experts"
        description="Join our events to learn about the latest in enterprise technology and connect with industry leaders."
      />

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Upcoming"
            title="Don't Miss Out"
          />
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <GlassCard key={index} className="group" glow={index === 0}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {event.type}
                      </span>
                      {event.virtual && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Video className="h-3 w-3" />
                          Virtual Event
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{event.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                      {event.speakers && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.speakers.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <GlowButton icon>
                      Register Now
                    </GlowButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Past Events"
            title="Watch the Recordings"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {pastEvents.map((event, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {event.type}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  {event.recording && (
                    <button className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary hover:bg-primary/20 transition-colors">
                      <Video className="h-4 w-4" />
                      Watch
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <GlassCard className="text-center p-12" glow>
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Never Miss an Event</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Add our events calendar to your own and stay updated on all upcoming events.
            </p>
            <div className="mt-6">
              <GlowButton variant="outline">
                Add to Calendar
              </GlowButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <CTABanner
        title="Want Us at Your Event?"
        description="Our team is available for speaking engagements and workshops."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
