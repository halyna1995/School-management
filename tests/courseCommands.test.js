import { describe, expect, test } from "vitest";
import { handleCourseCommand } from "../src/courseCommands.js";

describe("courseCommands (simple validation tests)", () => {
  test("COURSE ADD -> error when missing params", () => {
    const out = handleCourseCommand("ADD", ["JS"]); // no date
    expect(out).toBe("ERROR: Must provide course name and start date");
  });

  test("COURSE ADD -> error when date has wrong format", () => {
    const out = handleCourseCommand("ADD", ["JS", "2026/02/01"]);
    expect(out).toBe("ERROR: Invalid start date. Must be in yyyy-MM-dd format");
  });

  test("COURSE ADD -> error when date does not exist (Feb 31)", () => {
    const out = handleCourseCommand("ADD", ["JS", "2026-02-31"]);
    expect(out).toBe("ERROR: Invalid start date. Must be in yyyy-MM-dd format");
  });

  test("COURSE JOIN -> error when missing params", () => {
    const out = handleCourseCommand("JOIN", ["10"]); // no trainee id
    expect(out).toBe("ERROR: Must provide course ID and trainee ID");
  });
});