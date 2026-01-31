import { describe, it, expect } from "vitest";
import { render, screen, within } from "@/test/utils/test-utils";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("should render hero section", () => {
    render(<Index />);

    const main = screen.getByRole("main");
    expect(within(main).getByText(/Building the/i)).toBeInTheDocument();
    expect(within(main).getByText(/Future/i)).toBeInTheDocument();
  });

  it("should render service cards", () => {
    render(<Index />);

    const main = screen.getByRole("main");
    expect(within(main).getByText("Software Engineering")).toBeInTheDocument();
    expect(within(main).getByText("Cloud Architecture")).toBeInTheDocument();
    expect(within(main).getByText("Cybersecurity")).toBeInTheDocument();
    expect(within(main).getByText("AI & Machine Learning")).toBeInTheDocument();
  });

  it("should render stats section", () => {
    render(<Index />);

    // Stats appear multiple times, so check they exist
    const stats = screen.getAllByText("100+");
    expect(stats.length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projects Delivered").length).toBeGreaterThan(0);
  });

  it("should render testimonials", () => {
    render(<Index />);

    expect(screen.getByText(/EthiData transformed our entire infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("should render case studies section", () => {
    render(<Index />);

    // Use getAllBy since "Case Studies" might appear multiple times
    const caseStudyTexts = screen.getAllByText(/Case Studies/i);
    expect(caseStudyTexts.length).toBeGreaterThan(0);
    expect(screen.getByText("Cloud Migration for Fortune 500")).toBeInTheDocument();
  });

  it("should render CTA buttons with correct links", () => {
    render(<Index />);

    const main = screen.getByRole("main");
    const exploreServicesButton = within(main).getByRole("link", { name: /explore services/i });
    expect(exploreServicesButton).toHaveAttribute("href", "/services");

    // "Get in Touch" is in the hero section
    const getInTouchButtons = within(main).getAllByRole("link", { name: /get in touch/i });
    expect(getInTouchButtons[0]).toHaveAttribute("href", "/contact");
  });

  it("should render technology partners section", () => {
    render(<Index />);

    expect(screen.getByText(/Trusted Technology Partners/i)).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Google Cloud")).toBeInTheDocument();
  });

  it("should render about preview section", () => {
    render(<Index />);

    expect(screen.getByText(/About EthiData/i)).toBeInTheDocument();
    expect(screen.getByText(/Technology Partners You Can Trust/i)).toBeInTheDocument();
  });

  it("should render CTA banner", () => {
    render(<Index />);

    expect(screen.getByText(/Ready to Transform Your Business/i)).toBeInTheDocument();
  });
});
