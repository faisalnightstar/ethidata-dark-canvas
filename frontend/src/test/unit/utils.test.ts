import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toContain("active-class");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base-class", undefined, null, "other-class");
    expect(result).toContain("base-class");
    expect(result).toContain("other-class");
  });

  it("should handle empty strings", () => {
    const result = cn("base-class", "", "other-class");
    expect(result).toContain("base-class");
    expect(result).toContain("other-class");
  });

  it("should merge tailwind classes correctly", () => {
    const result = cn("p-4 p-6", "p-2");
    expect(result).toBe("p-2");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toContain("class1");
    expect(result).toContain("class2");
    expect(result).toContain("class3");
  });

  it("should handle objects with conditional classes", () => {
    const result = cn({
      "active": true,
      "inactive": false,
      "base": true,
    });
    expect(result).toContain("active");
    expect(result).toContain("base");
    expect(result).not.toContain("inactive");
  });

  it("should handle multiple conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn(
      "base",
      isActive && "active",
      isDisabled && "disabled"
    );
    expect(result).toContain("base");
    expect(result).toContain("active");
    expect(result).not.toContain("disabled");
  });

  it("should handle no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should prioritize later conflicting classes", () => {
    const result = cn("text-sm", "text-lg", "text-base");
    expect(result).toBe("text-base");
  });
});
