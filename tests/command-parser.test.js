import { describe, expect, test } from 'vitest';
import { parseCommand } from "../src/command-parser.js";
  
describe("parseCommand", () => {
  test("parses command, subcommand and args", () => {
    expect(parseCommand("TRAINEE ADD John Doe")).toEqual({
      command: "TRAINEE",
      subcommand: "ADD",
      args: ["John", "Doe"],
    });
  });

  test("handles extra spaces", () => {
    expect(parseCommand("  COURSE   JOIN   10   20  ")).toEqual({
      command: "COURSE",
      subcommand: "JOIN",
      args: ["10", "20"],
    });
  });

  test("empty string -> nulls", () => {
    expect(parseCommand("   ")).toEqual({
      command: null,
      subcommand: null,
      args: [],
    });
  });

  test("command with no args", () => {
    expect(parseCommand("TRAINEE GETALL")).toEqual({
      command: "TRAINEE",
      subcommand: "GETALL",
      args: [],
    });
  });
});
