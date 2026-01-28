import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/NotFound";
import ServiceDetail from "@/pages/ServiceDetail";
import ProductDetail from "@/pages/ProductDetail";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import IndustryDetail from "@/pages/IndustryDetail";
import BlogArticle from "@/pages/BlogArticle";
import JobDetail from "@/pages/JobDetail";

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Wrapper for routing tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Test routes by rendering them directly with MemoryRouter
describe("App routing", () => {
  it("should render Index page at root route", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    const main = screen.getByRole("main");
    expect(within(main).getByText(/Building the/i)).toBeInTheDocument();
  });

  it("should render Contact page at /contact", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/contact"]}>
          <Routes>
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    const main = screen.getByRole("main");
    expect(within(main).getByText(/Let's Start a Conversation/i)).toBeInTheDocument();
  });

  it("should render Resources page at /resources", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/resources"]}>
          <Routes>
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByText("Knowledge Hub")).toBeInTheDocument();
  });

  it("should render NotFound page for invalid routes", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/non-existent-route"]}>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });

  it("should render ServiceDetail page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/services/test-service"]}>
          <Routes>
            <Route path="/services/:slug" element={<ServiceDetail />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    // ServiceDetail should render (check for header in layout)
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render ProductDetail page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/products/test-product"]}>
          <Routes>
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render CaseStudyDetail page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/case-studies/test-case-study"]}>
          <Routes>
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render IndustryDetail page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/industries/test-industry"]}>
          <Routes>
            <Route path="/industries/:slug" element={<IndustryDetail />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render BlogArticle page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/blog/test-article"]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogArticle />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render JobDetail page with slug parameter", () => {
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/jobs/test-job"]}>
          <Routes>
            <Route path="/jobs/:slug" element={<JobDetail />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
