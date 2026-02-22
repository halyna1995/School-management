import chalk from 'chalk';
import promptSync from 'prompt-sync';
import { parseCommand } from './command-parser.js';
import { handleTraineeCommand } from './traineeCommands.js';
import { handleCourseCommand } from './courseCommands.js';
// Function prompt
const prompt = promptSync({ sigint: true });
// Tittle of the project
console.log('School Management CLI');
// Exit the project
console.log('Type QUIT or q to exit.');

while (true) {
  // Read the text from user
  const line = prompt('> ');
  // Condition if we press q then exit the project
  if (line === 'QUIT' || line === 'q') {
    // Exit from the loop
    break;
  }
  // Parse the line into command/subcommand/arguments
  const { command, subcommand, args } = parseCommand(line);
  // If missing command/subcommand -> error
  if (!command || !subcommand) {
    console.log(chalk.red('ERROR: Invalid command'));
    continue;
  }
  // Default output
  let output = 'ERROR: Invalid command';
  // Choose handler
  if (command === 'TRAINEE') {
    output = handleTraineeCommand(subcommand, args);
  } else if (command === 'COURSE') {
    output = handleCourseCommand(subcommand, args);
  }
  // Print output (errors in red)
  if (typeof output === 'string' && output.startsWith('ERROR:')) {
    console.log(chalk.red(output));
  } else if (typeof output === 'string' && output.length > 0) {
    console.log(output);
  }
}
console.log('Bye!');
