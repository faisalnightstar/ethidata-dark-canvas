import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@/test/utils/test-utils";
import Resources from "@/pages/Resources";

describe("Resources page", () => {
  it("should render page header", () => {
    render(<Resources />);
    
    const main = screen.getByRole("main");
    expect(within(main).getByText("Knowledge Hub")).toBeInTheDocument();
  });

  it("should render filter buttons", () => {
    render(<Resources />);
    
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Whitepapers" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guides" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Templates" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reports" })).toBeInTheDocument();
  });

  it("should show all resources when 'All' filter is selected", () => {
    render(<Resources />);
    
    expect(screen.getByText("Enterprise Cloud Migration Guide")).toBeInTheDocument();
    expect(screen.getByText("AI Implementation Framework")).toBeInTheDocument();
    expect(screen.getByText("Security Audit Checklist")).toBeInTheDocument();
  });

  it("should filter resources by category when filter button is clicked", () => {
    render(<Resources />);
    
    // Click on Guides filter
    const guidesButton = screen.getByRole("button", { name: "Guides" });
    fireEvent.click(guidesButton);
    
    // Should show only Guides category resources
    expect(screen.getByText("Enterprise Cloud Migration Guide")).toBeInTheDocument();
  });

  it("should filter resources by Whitepapers category", () => {
    render(<Resources />);
    
    const whitepapersButton = screen.getByRole("button", { name: "Whitepapers" });
    fireEvent.click(whitepapersButton);
    
    expect(screen.getByText("AI Implementation Framework")).toBeInTheDocument();
  });

  it("should filter resources by Templates category", () => {
    render(<Resources />);
    
    const templatesButton = screen.getByRole("button", { name: "Templates" });
    fireEvent.click(templatesButton);
    
    expect(screen.getByText("Security Audit Checklist")).toBeInTheDocument();
  });

  it("should show gated content indicators", () => {
    render(<Resources />);
    
    // Resources with gated: true should show "Gated" text
    const gatedResources = screen.getAllByText("Gated");
    expect(gatedResources.length).toBeGreaterThan(0);
  });

  it("should render download buttons for resources", () => {
    render(<Resources />);
    
    const downloadButtons = screen.getAllByRole("button", { name: /download/i });
    expect(downloadButtons.length).toBeGreaterThan(0);
  });

  it("should display resource details", () => {
    render(<Resources />);
    
    expect(screen.getByText("Enterprise Cloud Migration Guide")).toBeInTheDocument();
    expect(screen.getByText(/comprehensive guide to planning/i)).toBeInTheDocument();
  });

  it("should show resource type and page count", () => {
    render(<Resources />);
    
    // Check for resource metadata - use getAllByText since multiple resources have PDF
    const pdfTexts = screen.getAllByText(/PDF/);
    expect(pdfTexts.length).toBeGreaterThan(0);
    const pagesTexts = screen.getAllByText(/pages/);
    expect(pagesTexts.length).toBeGreaterThan(0);
  });

  it("should highlight active filter button", () => {
    render(<Resources />);
    
    const allButton = screen.getByRole("button", { name: "All" });
    expect(allButton).toHaveClass("bg-gradient-to-r");
    
    const guidesButton = screen.getByRole("button", { name: "Guides" });
    fireEvent.click(guidesButton);
    
    // After clicking, Guides should be active
    expect(guidesButton).toHaveClass("bg-gradient-to-r");
  });

  it("should render CTA banner", () => {
    render(<Resources />);
    
    expect(screen.getByText(/Need Custom Resources/i)).toBeInTheDocument();
  });
});
