import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import NotFound from "@/pages/NotFound";

describe("NotFound page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render 404 heading", () => {
    render(<NotFound />, { initialEntries: ["/non-existent"] });
    
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(<NotFound />, { initialEntries: ["/non-existent"] });
    
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });

  it("should render link to home page", () => {
    render(<NotFound />, { initialEntries: ["/non-existent"] });
    
    const homeLink = screen.getByRole("link", { name: /return to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should log error when rendered", () => {
    const consoleSpy = vi.spyOn(console, "error");
    
    render(<NotFound />, { initialEntries: ["/test-route"] });
    
    expect(consoleSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/test-route"
    );
  });

  it("should have correct styling classes", () => {
    const { container } = render(<NotFound />, { initialEntries: ["/non-existent"] });
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("flex", "min-h-screen", "items-center", "justify-center");
  });
});
