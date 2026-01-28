import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@/test/utils/test-utils";
import { Footer } from "@/components/layout/Footer";

describe("Footer component", () => {
  it("should render logo with correct text", () => {
    render(<Footer />);

    expect(screen.getByText("ETHI")).toBeInTheDocument();
    expect(screen.getByText("DATA")).toBeInTheDocument();
  });

  it("should render company description", () => {
    render(<Footer />);

    expect(screen.getByText(/Empowering enterprises/i)).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<Footer />);

    expect(screen.getByText("abufaisal@ethicodes.com")).toBeInTheDocument();
    expect(screen.getByText("+91-8285961002")).toBeInTheDocument();
    expect(screen.getByText("Greater Noida, IN")).toBeInTheDocument();
  });

  it("should render social media links", () => {
    render(<Footer />);

    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
  });

  it("should render company links section", () => {
    render(<Footer />);

    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About Us" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Team" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Careers" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Press" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("should render services links section", () => {
    render(<Footer />);

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Industries" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Case Studies" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
  });

  it("should render resources links section", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    // Resources heading (h3) in footer
    const headings = within(footer).getAllByRole("heading");
    const resourcesHeading = headings.find(h => h.textContent === "Resources");
    expect(resourcesHeading).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Events" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Testimonials" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Partnerships" })).toBeInTheDocument();
  });

  it("should render newsletter subscription form", () => {
    render(<Footer />);

    expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("should handle newsletter form submission", () => {
    render(<Footer />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");

    fireEvent.click(submitButton);
    // Form submission is handled (no error should occur)
  });

  it("should render copyright text", () => {
    render(<Footer />);

    expect(screen.getByText(/© 2024 EthiData & Technologies/i)).toBeInTheDocument();
  });

  it("should render privacy and terms links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Terms of Service" })).toBeInTheDocument();
  });

  it("should have correct hrefs for footer links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute("href", "/team");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  it("should have correct href for logo link", () => {
    render(<Footer />);

    const logoLink = screen.getByText("ETHI").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should have mailto link for email", () => {
    render(<Footer />);

    const emailLink = screen.getByText("abufaisal@ethicodes.com").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:abufaisal@ethicodes.com");
  });

  it("should have tel link for phone", () => {
    render(<Footer />);

    const phoneLink = screen.getByText("+91-8285961002").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+1234567890");
  });
});
