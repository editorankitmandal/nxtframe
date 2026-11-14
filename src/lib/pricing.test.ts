import { describe, expect, it } from "vitest";
import { formatMonthlyPrice, PLANS } from "./pricing";

const plan = (name: string) => {
  const found = PLANS.find((p) => p.name === name);
  if (!found) throw new Error(`missing plan ${name}`);
  return found;
};

describe("pricing plans", () => {
  it("Shorts Starter is $249 a month for 8 short-form videos", () => {
    expect(formatMonthlyPrice(plan("Shorts Starter").priceUsd)).toBe("$249 / month");
    expect(plan("Shorts Starter").features).toContain("8 short-form videos");
  });

  it("Creator Growth is $449 a month for 16 short-form videos", () => {
    expect(formatMonthlyPrice(plan("Creator Growth").priceUsd)).toBe("$449 / month");
    expect(plan("Creator Growth").features).toContain("16 short-form videos");
  });

  it("Content Studio is $999 a month for 4 long-form and 8 short-form videos", () => {
    expect(formatMonthlyPrice(plan("Content Studio").priceUsd)).toBe("$999 / month");
    expect(plan("Content Studio").features).toEqual(
      expect.arrayContaining(["4 long-form YouTube videos", "8 short-form videos"]),
    );
  });

  it("every plan includes 2 revision rounds per video", () => {
    for (const p of PLANS) expect(p.features).toContain("2 revision rounds per video");
  });
});
