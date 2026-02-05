import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import Press from "./pages/Press";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import Partnerships from "./pages/Partnerships";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import { Loader3D } from "./components/3d";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  
  // Only show loader on initial page load, not on navigation
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('app-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowLoader(false);
    }
  }, []);
  
  const handleLoaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('app-loaded', 'true');
    // Small delay before removing from DOM
    setTimeout(() => setShowLoader(false), 100);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showLoader && isLoading && (
          <Loader3D onComplete={handleLoaderComplete} duration={2000} />
        )}
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          <Toaster />
          <Analytics />
          <SpeedInsights />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />

              {/* Services */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />

              {/* Industries */}
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />

              {/* Case Studies */}
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

              {/* Products */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Content */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/events" element={<Events />} />
              <Route path="/press" element={<Press />} />

              {/* Careers */}
              <Route path="/careers" element={<Careers />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:slug" element={<JobDetail />} />
              <Route path="/apply" element={<ApplicationSuccess />} />

              {/* Other */}
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/testimonials" element={<Testimonials />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
