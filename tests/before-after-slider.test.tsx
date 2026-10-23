import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Render a plain <img>, dropping next/image-only props so React doesn't warn about them.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const rest = { ...props };
    delete rest.fill;
    delete rest.priority;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

function renderSlider() {
  render(
    <BeforeAfterSlider
      photo="/images/coastal.jpg"
      label="Driveway & full exterior"
      tag="Driveway"
      beforeLabel="Before"
      afterLabel="After"
      sliderLabel="Before and after comparison"
    />
  );
  return screen.getByRole("slider", { name: "Before and after comparison: Driveway & full exterior" });
}

describe("BeforeAfterSlider", () => {
  it("starts centered", () => {
    expect(renderSlider()).toHaveAttribute("aria-valuenow", "50");
  });

  it("moves with arrow keys and jumps with Home/End", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "52");
    fireEvent.keyDown(slider, { key: "ArrowLeft", shiftKey: true });
    expect(slider).toHaveAttribute("aria-valuenow", "42");
    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });

  it("shows both labels and the project title", () => {
    renderSlider();
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Driveway & full exterior" })).toBeInTheDocument();
  });
});
