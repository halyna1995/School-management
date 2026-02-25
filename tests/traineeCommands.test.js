import { describe, expect, test } from 'vitest';
import { handleTraineeCommand } from '../src/traineeCommands.js';
import { loadTraineeData, saveTraineeData } from '../src/storage.js';

describe('traineeCommands (simple validation tests)', () => {
  test('TRAINEE ADD -> error when missing last name', () => {
    const out = handleTraineeCommand('ADD', ['Halyna']);
    expect(out).toBe('ERROR: Must provide first and last name');
  });

  test('TRAINEE UPDATE -> error when missing params', () => {
    const out = handleTraineeCommand('UPDATE', ['123']);
    expect(out).toBe('ERROR: Must provide ID, first name and last name');
  });

  test('TRAINEE DELETE -> error when missing ID', () => {
    const out = handleTraineeCommand('DELETE', []);
    expect(out).toBe('ERROR: Invalid command');
  });

  test('TRAINEE GET -> error when missing ID', () => {
    const out = handleTraineeCommand('GET', []);
    expect(out).toBe('ERROR: Invalid command');
  });

  test('TRAINEE ADD -> creates trainee ', () => {
    // reset data
    saveTraineeData([]);
    const out = handleTraineeCommand('ADD', ['John', 'Doe']);
    expect(out.startsWith('CREATED:')).toBe(true);
    const trainees = loadTraineeData();
    expect(trainees.length).toBe(1);
    expect(trainees[0].firstName).toBe('John');
    expect(trainees[0].lastName).toBe('Doe');
  });
});
