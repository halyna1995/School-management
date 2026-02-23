import { saveCourseData, loadCourseData, loadTraineeData} from './storage.js';

function addCourse(args) {
  // COURSE ADD <name> <startDate>
  const name = args[0];
  const startDate = args[1];
  if (!name || !startDate) {
    return "ERROR: Must provide course name and start date";
  }
  // Date validation 
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  const parts = startDate.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (month < 1 || month > 12) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  if (day < 1) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  let daysInMonth = 31;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  } else if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    daysInMonth = isLeapYear ? 29 : 28;
  }
  if (day > daysInMonth) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  const courses = loadCourseData();
  // Generate random unique ID between 0 and 99999
  let id = Math.floor(Math.random() * 100000);
  while (courses.some((course) => course.id === id)) {
    id = Math.floor(Math.random() * 100000);
  }
  courses.push({ id, name, startDate, participants: [] });
  saveCourseData(courses);
  return `CREATED: ${id} ${name} ${startDate}`;
}

function updateCourse(args) {
  // COURSE UPDATE <ID> <name> <startDate>
  const idString = args[0];
  const name = args[1];
  const startDate = args[2];
  if (!idString || !name || !startDate) {
    return "ERROR: Must provide ID, name and start date.";
  }
  // Date validation (format + real date), no ISO
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  const parts = startDate.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (month < 1 || month > 12) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  if (day < 1) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  let daysInMonth = 31;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  } else if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    daysInMonth = isLeapYear ? 29 : 28;
  }
  if (day > daysInMonth) {
    return "ERROR: Invalid start date. Must be in yyyy-MM-dd format";
  }
  const id = Number(idString);
  const courses = loadCourseData();
  const course = Number.isInteger(id) ? courses.find((course1) => course1.id === id) : null;
  if (!course) {
    return `ERROR: Course with ID ${idString} does not exist`;
  }
  course.name = name;
  course.startDate = startDate;
  saveCourseData(courses);
  return `UPDATED: ${course.id} ${course.name} ${course.startDate}`;
}

function deleteCourse(args) {
  // COURSE DELETE <ID>
  const idString = args[0];
  if (!idString) {
    return "ERROR: Invalid command";
  }
  const id = Number(idString);
  const courses = loadCourseData();
  const course = Number.isInteger(id) ? courses.find((course1) => course1.id === id) : null;
  if (!course) {
    return `ERROR: Course with ID ${idString} does not exist`;
  }
  const newCourses = courses.filter((course) => course.id !== id);
  saveCourseData(newCourses);
  return `DELETED: ${course.id} ${course.name}`;
}

function joinCourse(args) {
  // COURSE JOIN <courseID> <traineeID>
  const courseIdString = args[0];
  const traineeIdString = args[1];
  if (!courseIdString || !traineeIdString) {
    return "ERROR: Must provide course ID and trainee ID";
  }
  const courseId = Number(courseIdString);
  const traineeId = Number(traineeIdString);
  const courses = loadCourseData();
  const trainees = loadTraineeData();
  const course = Number.isInteger(courseId)
    ? courses.find((course1) => course1.id === courseId)
    : null;
  if (!course) {
    return `ERROR: Course with ID ${courseIdString} does not exist`;
  }
  const trainee = Number.isInteger(traineeId)
    ? trainees.find((trainee1) => trainee1.id === traineeId)
    : null;
  if (!trainee) {
    return `ERROR: Trainee with ID ${traineeIdString} does not exist`;
  }
  if (!course.participants) course.participants = [];
  if (course.participants.includes(traineeId)) {
    return "ERROR: The Trainee has already joined this course";
  }
  if (course.participants.length >= 20) {
    return "ERROR: The course is full.";
  }
  // Trainee cannot join more than 5 courses
  let count = 0;
  for (const courseItem of courses) {
    const participants = courseItem.participants || [];
    if (participants.includes(traineeId)) {
      count++;
    }
  }
  if (count >= 5) {
    return "ERROR: A trainee is not allowed to join more than 5 courses.";
  }
  course.participants.push(traineeId);
  saveCourseData(courses);
  return `${trainee.firstName} ${trainee.lastName} Joined ${course.name}`;
}

function leaveCourse(args) {
  
   // COURSE LEAVE <courseID> <traineeID>
  const courseIdString = args[0];
  const traineeIdString = args[1];
  if (!courseIdString || !traineeIdString) {
    return "ERROR: Must provide course ID and trainee ID";
  }
  const courseId = Number(courseIdString);
  const traineeId = Number(traineeIdString);
  const courses = loadCourseData();
  const trainees = loadTraineeData();
  const course = Number.isInteger(courseId)
    ? courses.find((course1) => course1.id === courseId)
    : null;
  if (!course) {
    return `ERROR: Course with ID ${courseIdString} does not exist`;
  }
  const trainee = Number.isInteger(traineeId)
    ? trainees.find((trainee1) => trainee1.id === traineeId)
    : null;
  if (!trainee) {
    return `ERROR: Trainee with ID ${traineeIdString} does not exist`;
  }
  if (!course.participants) course.participants = [];
  if (!course.participants.includes(traineeId)) {
    return "ERROR: The Trainee did not join the course";
  }
  course.participants = course.participants.filter((id) => id !== traineeId);
  saveCourseData(courses);
  return `${trainee.firstName} ${trainee.lastName} Left ${course.name}`;
}

function getCourse(args) {
  // COURSE GET <ID>
  const idString = args[0];
  if (!idString) {
    return "ERROR: Invalid command";
  }
  const courseId = Number(idString);
  const courses = loadCourseData();
  const course = Number.isInteger(courseId)
    ? courses.find((course1) => course1.id === courseId)
    : null;
  if (!course) {
    return `ERROR: Course with ID ${idString} does not exist`;
  }
  const trainees = loadTraineeData();
  const participantIds = course.participants || [];
  const lines = [];
  lines.push(`${course.id} ${course.name} ${course.startDate}`);
  lines.push(`Participants (${participantIds.length}):`);
  for (const traineeId of participantIds) {
    const trainee = trainees.find((trainee1) => trainee1.id === traineeId);
    if (trainee) {
      lines.push(`- ${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
    }
  }
  return lines.join("\n");
}

function getAllCourses() {
  // COURSE GETALL (sorted by start date)
  const courses = loadCourseData();
  const sorted = courses.slice().sort((a, b) => {
    if (a.startDate < b.startDate) return -1;
    if (a.startDate > b.startDate) return 1;
    return 0;
  });
  const lines = ["Courses:"];
  for (const course of sorted) {
    const amount = (course.participants || []).length;
    const full = amount >= 20 ? " FULL" : "";
    lines.push(`${course.id} ${course.name} ${course.startDate} ${amount}${full}`);
  }
  lines.push("");
  lines.push(`Total: ${sorted.length}`);
  return lines.join("\n");
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  switch (subcommand) {
    case "ADD":
      return addCourse(args);
    case "UPDATE":
      return updateCourse(args);
    case "DELETE":
      return deleteCourse(args);
    case "JOIN":
      return joinCourse(args);
    case "LEAVE":
      return leaveCourse(args);
    case "GET":
      return getCourse(args);
    case "GETALL":
      return getAllCourses();
    default:
      return "ERROR: Invalid command";
  }
}