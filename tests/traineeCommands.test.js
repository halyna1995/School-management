import { describe, expect, test } from "vitest";
import { handleTraineeCommand } from "../src/traineeCommands.js";

describe("traineeCommands (simple validation tests)", () => {
  test("TRAINEE ADD -> error when missing last name", () => {
    const out = handleTraineeCommand("ADD", ["Halyna"]); // no last name
    expect(out).toBe("ERROR: Must provide first and last name");
  });

  test("TRAINEE UPDATE -> error when missing params", () => {
    const out = handleTraineeCommand("UPDATE", ["123"]); // missing firstName/lastName
    expect(out).toBe("ERROR: Must provide ID, first name and last name");
  });

  test("TRAINEE DELETE -> error when missing ID", () => {
    const out = handleTraineeCommand("DELETE", []); // no id
    expect(out).toBe("ERROR: Invalid command");
  });

  test("TRAINEE GET -> error when missing ID", () => {
    const out = handleTraineeCommand("GET", []); // no id
    expect(out).toBe("ERROR: Invalid command");
  });
});