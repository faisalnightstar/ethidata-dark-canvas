import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@/test/utils/test-utils";
import Contact from "@/pages/Contact";

describe("Contact page", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render page header", () => {
    render(<Contact />);

    const main = screen.getByRole("main");
    expect(within(main).getByText(/Let's Start a Conversation/i)).toBeInTheDocument();
  });

  it("should render contact form", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("should render contact info cards", () => {
    render(<Contact />);

    // Use getAllByText since there may be multiple instances
    const emailTexts = screen.getAllByText("Email");
    expect(emailTexts.length).toBeGreaterThan(0);

    const helloEmails = screen.getAllByText("abufaisal@ethicodes.com");
    expect(helloEmails.length).toBeGreaterThan(0);
  });

  it("should update form fields when user types", () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("should handle form submission", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(subjectInput, { target: { value: "Test Subject" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Form submitted:",
        expect.objectContaining({
          name: "John Doe",
          email: "john@example.com",
          subject: "Test Subject",
          message: "Test message",
        })
      );
    });
  });

  it("should have required fields", () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
    expect(subjectInput).toHaveAttribute("required");
    expect(messageInput).toHaveAttribute("required");
  });

  it("should validate email format", () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email/i);

    // HTML5 email validation
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should render all contact info items", () => {
    render(<Contact />);

    const main = screen.getByRole("main");
    // Check that contact info sections exist within main
    expect(within(main).getAllByText("Email").length).toBeGreaterThan(0);
    expect(within(main).getAllByText("Phone").length).toBeGreaterThan(0);
    expect(within(main).getByText("Office")).toBeInTheDocument();
    expect(within(main).getByText("Response Time")).toBeInTheDocument();
  });

  it("should have correct contact information", () => {
    render(<Contact />);

    const main = screen.getByRole("main");
    expect(within(main).getAllByText("abufaisal@ethicodes.com").length).toBeGreaterThan(0);
    expect(within(main).getAllByText("+91-8285961002").length).toBeGreaterThan(0);
    expect(within(main).getAllByText("Greater Noida, IN").length).toBeGreaterThan(0);
    expect(within(main).getByText("Within 24 hours")).toBeInTheDocument();
  });
});
