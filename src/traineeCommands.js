import { saveTraineeData, loadTraineeData, loadCourseData, saveCourseData } from './storage.js';

function addTrainee(args) {
  // TRAINEE ADD <firstName> <lastName>
  const firstName = args[0];
  const lastName = args[1];
  if (!firstName || !lastName) {
    return "ERROR: Must provide first and last name";
  }
  const trainees = loadTraineeData();
  // Generate random unique ID between 0 and 99999
  let id = Math.floor(Math.random() * 100000);
  while (trainees.some((t) => t.id === id)) {
    id = Math.floor(Math.random() * 100000);
  }
  trainees.push({ id, firstName, lastName });
  saveTraineeData(trainees);
  return `CREATED: ${id} ${firstName} ${lastName}`;
}

function updateTrainee(args) {
  // TRAINEE UPDATE <ID> <firstName> <lastName>
  const idString = args[0];
  const firstName = args[1];
  const lastName = args[2];
  if (!idString || !firstName || !lastName) {
    return "ERROR: Must provide ID, first name and last name";
  }
  const id = Number(idString);
  const trainees = loadTraineeData();
  const trainee = Number.isInteger(id) ? trainees.find((trainee1) => trainee1.id === id) : null;
  if (!trainee) {
    return `ERROR: Trainee with ID ${idString} does not exist`;
  }
  trainee.firstName = firstName;
  trainee.lastName = lastName;
  saveTraineeData(trainees);
  return `UPDATED: ${trainee.id} ${trainee.firstName} ${trainee.lastName}`;
}

function deleteTrainee(args) {
  // TRAINEE DELETE <ID>
  const idString = args[0];
  if (!idString) {
    return "ERROR: Invalid command"; 
  }
  const id = Number(idString);
  const trainees = loadTraineeData();
  const index = Number.isInteger(id) ? trainees.findIndex((trainee) => trainee.id === id) : -1;
  if (index === -1) {
    return `ERROR: Trainee with ID ${idString} does not exist`;
  }
  const removed = trainees[index];
  trainees.splice(index, 1);
  saveTraineeData(trainees);
  // remove this trainee ID from all courses
  const courses = loadCourseData();
  let changed = false;
  for (const course of courses) {
    const before = (course.participants || []).length;
    course.participants = (course.participants || []).filter((traineeID) => traineeID !== removed.id);
    const after = (course.participants || []).length;
    if (after !== before) changed = true;
  }
  if (changed) {
    saveCourseData(courses);
  }
  return `DELETED: ${removed.id} ${removed.firstName} ${removed.lastName}`;
}

function fetchTrainee(args) {
  // TRAINEE GET <ID>
  const idString = args[0];
  if (!idString) {
    return "ERROR: Invalid command";
  }
  const id = Number(idString);
  const trainees = loadTraineeData();
  const trainee = Number.isInteger(id) ? trainees.find((trainee1) => trainee1.id === id) : null;
  if (!trainee) {
    return `ERROR: Trainee with ID ${idString} does not exist`;
  }
  // Find all courses where this trainee participates
  const courses = loadCourseData();
  const courseNames = [];
  for (const course of courses) {
    const participants = course.participants || [];
    if (participants.includes(trainee.id)) {
      courseNames.push(course.name);
    }
  }
  const coursesLine =
    courseNames.length === 0
      ? "Courses: None"
      : `Courses: ${courseNames.join(", ")}`;
  return `${trainee.id} ${trainee.firstName} ${trainee.lastName}\n${coursesLine}`;
}

function fetchAllTrainees() {
 // TRAINEE GETALL (sorted by last name)
  const trainees = loadTraineeData();
  const sorted = trainees.slice().sort((a, b) => {
    const aLast = String(a.lastName);
    const bLast = String(b.lastName);
    if (aLast < bLast) return -1;
    if (aLast > bLast) return 1;
    return 0;
  });
  const lines = ["Trainees:"];
  for (const trainee of sorted) {
    lines.push(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
  }
  lines.push("");
  lines.push(`Total: ${sorted.length}`);
  return lines.join("\n");
}

export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  // Call the correct function based on the subcommand
  switch (subcommand) {
    case "ADD":
      return addTrainee(args);
    case "UPDATE":
      return updateTrainee(args);
    case "DELETE":
      return deleteTrainee(args);
    case "GET":
      return fetchTrainee(args);
    case "GETALL":
      return fetchAllTrainees();
    default:
      return "ERROR: Invalid command";
  }
}