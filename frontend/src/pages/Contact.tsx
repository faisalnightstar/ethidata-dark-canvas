import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "abufaisal@ethicodes.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+91-8285961002",
    description: "Mon-Fri from 8am to 6pm",
  },
  {
    icon: MapPin,
    title: "Office",
    details: "Greater Noida, IN",
    description: "123 Tech Street, Suite 400",
  },
  {
    icon: Clock,
    title: "Response Time",
    details: "Within 24 hours",
    description: "We aim to respond quickly",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
    console.log("Form submitted:", formData);
    console.log("Response:", response);
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's Start a Conversation"
        description="Have a project in mind? We'd love to hear from you. Get in touch and let's create something amazing together."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 grid-row-2">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Form */}
              <div>
                <SectionHeader
                  eyebrow="Send a Message"
                  title="Get in Touch"
                  centered={false}
                />
                <GlassCard>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                        placeholder="Tell us about your project..."
                        required
                      />
                    </div>
                    <GlowButton className="w-full" icon>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </GlowButton>
                  </form>
                </GlassCard>
              </div>

              {/* Contact Info */}
              <div>
                <SectionHeader
                  eyebrow="Contact Info"
                  title="Reach Out"
                  centered={false}
                />
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <GlassCard key={index} className="group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3 transition-transform group-hover:scale-110">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          <p className="text-lg text-primary">{info.details}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
            {/* Map placeholder */}
            <div className=" mt-8 w-full">
              <GlassCard className="p-0 overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.70521356925!2d77.47932387654251!3d28.48024377574823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cebd1e4e70acb%3A0x2204513fe82bda61!2sVision%20Business%20Park!5e0!3m2!1sen!2sin!4v1769469201778!5m2!1sen!2sin" className="w-full h-96" loading="lazy" ></iframe>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
