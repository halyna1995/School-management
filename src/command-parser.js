export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
  // Conver userInput to the text
   let line = String(userInput);
  // Remove spaces at the beginning and end
  line = line.trim();
  // Check if we have not text
  if (line === "") {
    return { command: null, subcommand: null, args: [] };
  }
  // Split the line by spaces
  const parts = line.split(" ");
  // Remove empty elements
  const cleanParts = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== "") {
      cleanParts.push(parts[i]);
    }
  }
  // The first element is command, the second element is subcommand and the third element is arguments
  const command = cleanParts[0] || null;
  const subcommand = cleanParts[1] || null;
  const args = cleanParts.slice(2);
  return { command, subcommand, args };
}