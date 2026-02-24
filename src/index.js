import chalk from 'chalk';
import promptSync from 'prompt-sync';
import { parseCommand } from './command-parser.js';
import { handleTraineeCommand } from './traineeCommands.js';
import { handleCourseCommand } from './courseCommands.js';

const prompt = promptSync({ sigint: true });
console.log('School Management CLI');
console.log('Type QUIT or q to exit.');

while (true) {
  // Read the text from user
  const line = prompt('> ');
  if (!line || line === 'QUIT' || line === 'q') {
    break;
  }

  // Parse the line into command/subcommand/arguments
  const { command, subcommand, args } = parseCommand(line);

  if (!command || !subcommand) {
    console.log(chalk.red('ERROR: Invalid command'));
    continue;
  }

  let output = 'ERROR: Invalid command';

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
