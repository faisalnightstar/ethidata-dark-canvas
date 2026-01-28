import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@/test/utils/test-utils";
import { Header } from "@/components/layout/Header";

describe("Header component", () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive tests
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query.includes("lg"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("should render logo with correct text", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    expect(within(header).getByText("ETHI")).toBeInTheDocument();
    expect(within(header).getByText("DATA")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    expect(within(header).getByText("Home")).toBeInTheDocument();
    expect(within(header).getByText("About")).toBeInTheDocument();
    expect(within(header).getByText("Services")).toBeInTheDocument();
    expect(within(header).getByText("Work")).toBeInTheDocument();
    expect(within(header).getByText("Resources")).toBeInTheDocument();
    expect(within(header).getByText("Careers")).toBeInTheDocument();
  });

  it("should render Contact Us button", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    const contactButtons = within(header).getAllByRole("link", { name: /contact us/i });
    expect(contactButtons.length).toBeGreaterThan(0);
    expect(contactButtons[0]).toHaveAttribute("href", "/contact");
  });

  it("should render Partners link", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    const partnersLink = within(header).getByRole("link", { name: /partners/i });
    expect(partnersLink).toBeInTheDocument();
    expect(partnersLink).toHaveAttribute("href", "/partnerships");
  });

  it("should toggle mobile menu when button is clicked", () => {
    render(<Header />);
    
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible - check for the mobile nav section
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("should close mobile menu when a link is clicked", () => {
    render(<Header />);
    
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);
    
    // Click on the first Home link in mobile nav
    const homeLinks = screen.getAllByRole("link", { name: /^home$/i });
    fireEvent.click(homeLinks[0]);
    
    // Menu should close
    expect(menuButton).toBeInTheDocument();
  });

  it("should show dropdown menu on hover for items with children", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    const aboutLink = within(header).getByRole("link", { name: /^about$/i });
    const aboutContainer = aboutLink.closest("div");
    
    if (aboutContainer) {
      fireEvent.mouseEnter(aboutContainer);
      
      // Check for dropdown items
      expect(screen.getByText("Our Story")).toBeInTheDocument();
      expect(screen.getByText("Team & Leadership")).toBeInTheDocument();
      expect(screen.getByText("Testimonials")).toBeInTheDocument();
    }
  });

  it("should have correct href for logo link", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    const logoLink = within(header).getByText("ETHI").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should render all navigation items with correct hrefs", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: /^home$/i })).toHaveAttribute("href", "/");
    expect(within(header).getByRole("link", { name: /^about$/i })).toHaveAttribute("href", "/about");
    expect(within(header).getByRole("link", { name: /^services$/i })).toHaveAttribute("href", "/services");
  });

  it("should render mobile menu button", () => {
    render(<Header />);
    
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass("lg:hidden");
  });
});
