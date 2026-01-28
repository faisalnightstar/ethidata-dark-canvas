import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { Layout } from "@/components/layout/Layout";

describe("Layout component", () => {
  it("should render children correctly", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render Header component", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check for header element
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render Footer component", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check for footer element
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should render main content in main element", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("Test Content");
  });

  it("should apply correct layout classes", () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass("flex", "min-h-screen", "flex-col");
  });
});
