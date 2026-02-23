export function parseCommand(userInput) {
  const line = String(userInput).trim();

  if (line === "") {
    return { command: null, subcommand: null, args: [] };
  }

  // Split the line by spaces
 const parts = line.split(/\s+/);

  // Remove empty elements
const cleanParts = parts.filter((part) => part !== "");

  const command = cleanParts[0] || null;
  const subcommand = cleanParts[1] || null;
  const args = cleanParts.slice(2);

  return { command, subcommand, args };
}