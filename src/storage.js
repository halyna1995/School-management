import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  // Use the fs module to read the trainees.json file and return the data as a JavaScript object 
  // If the file does not exist yet, start with an empty list
  if (!fs.existsSync(TRAINEE_DATA_FILE_PATH)) {
    return [];
  }
  // Read JSON text from file and convert it to an array
  return JSON.parse(fs.readFileSync(TRAINEE_DATA_FILE_PATH, "utf8"));
}

export function saveTraineeData(trainees) {
  // Use the fs module to write the updated trainee data back to the trainees.json file 
  // Condition check if the data folder exists before writing files
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data", { recursive: true });
  }
  // Convert array to JSON text 
  const json = JSON.stringify(trainees, null, 2);
  // Write JSON text to the file
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, json, "utf8");
}

export function loadCourseData() {
  // TODO: Implement
  // If the file doesn't exist yet, start with an empty array
  if (!fs.existsSync(COURSE_DATA_FILE_PATH)) {
    return [];
  }
  // Read JSON text from file and convert it to an array
  return JSON.parse(fs.readFileSync(COURSE_DATA_FILE_PATH, "utf8"));
}

export function saveCourseData(courses) {
  // TODO: Implement
  // Condition check if the data folder exists before writing files
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data", { recursive: true });
  }
  // Convert array to JSON text 
  const json = JSON.stringify(courses, null, 2);
  // Write JSON text to the file
  fs.writeFileSync(COURSE_DATA_FILE_PATH, json, "utf8");
}
