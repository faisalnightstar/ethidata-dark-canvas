import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { NavLink } from "@/components/NavLink";

describe("NavLink component", () => {
  it("should render link with correct text", () => {
    render(<NavLink to="/test">Test Link</NavLink>);
    
    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("should have correct href attribute", () => {
    render(<NavLink to="/test">Test Link</NavLink>);
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should apply activeClassName when link is active", () => {
    render(
      <NavLink to="/test" activeClassName="active-class">
        Test Link
      </NavLink>,
      { initialEntries: ["/test"] }
    );
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("active-class");
  });

  it("should not apply activeClassName when link is not active", () => {
    render(
      <NavLink to="/test" activeClassName="active-class">
        Test Link
      </NavLink>,
      { initialEntries: ["/other"] }
    );
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).not.toHaveClass("active-class");
  });

  it("should merge custom className with activeClassName", () => {
    render(
      <NavLink 
        to="/test" 
        className="custom-class"
        activeClassName="active-class"
      >
        Test Link
      </NavLink>,
      { initialEntries: ["/test"] }
    );
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("custom-class");
    expect(link).toHaveClass("active-class");
  });

  it("should handle navigation on click", () => {
    render(<NavLink to="/test">Test Link</NavLink>);
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
  });

  it("should forward ref correctly", () => {
    const ref = { current: null };
    
    render(
      <NavLink to="/test" ref={ref}>
        Test Link
      </NavLink>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("should handle multiple className inputs", () => {
    render(
      <NavLink 
        to="/test" 
        className="class1 class2"
        activeClassName="active"
      >
        Test Link
      </NavLink>,
      { initialEntries: ["/test"] }
    );
    
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("active");
  });
});
