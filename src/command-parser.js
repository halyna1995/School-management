export function parseCommand(userInput) {
  const line = String(userInput).trim();

  if (line === '') {
    return { command: null, subcommand: null, args: [] };
  }

  // Split by one-or-more whitespace characters
  const parts = line.split(/\s+/);

  const command = parts[0] ? parts[0].toUpperCase() : null;
  const subcommand = parts[1] ? parts[1].toUpperCase() : null;
  const args = parts.slice(2);

  return { command, subcommand, args };
}
