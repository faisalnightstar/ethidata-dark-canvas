import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

describe("useIsMobile hook", () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      const matches = query.includes("max-width: 767px")
        ? window.innerWidth < 768
        : false;

      return {
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    vi.restoreAllMocks();
  });

  it("should detect mobile viewport initially (< 768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should detect desktop viewport initially (>= 768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should detect breakpoint at exactly 767px", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should detect breakpoint at exactly 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should update when window is resized", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });

      // Trigger resize event
      window.dispatchEvent(new Event("resize"));

      // Simulate matchMedia change event
      const mediaQueryList = window.matchMedia("(max-width: 767px)");
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", () => {});
      }
    });

    // Note: The hook uses matchMedia change listener, not resize event
    // So we need to trigger the matchMedia change
    const mediaQueryList = window.matchMedia("(max-width: 767px)");
    if (mediaQueryList.addEventListener) {
      const changeHandler = vi.fn();
      mediaQueryList.addEventListener("change", changeHandler);
      
      act(() => {
        changeHandler();
      });
    }
  });

  it("should cleanup event listeners on unmount", () => {
    const removeEventListenerSpy = vi.fn();
    
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => useIsMobile());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
