import { describe, expect, test } from "vitest";

import {
  saveTraineeData,
  loadTraineeData,
  saveCourseData,
  loadCourseData,
} from "../src/storage.js";

describe("storage", () => {
  test("saveTraineeData + loadTraineeData works", () => {
    const trainees = [
      { id: 1, firstName: "John", lastName: "Doe" },
      { id: 2, firstName: "Jane", lastName: "Smith" },
    ];
    saveTraineeData(trainees);
    const loaded = loadTraineeData();
    expect(loaded).toEqual(trainees);
  });

  test("saveCourseData + loadCourseData works", () => {
    const courses = [
      { id: 10, name: "JS", startDate: "2026-02-01", participants: [1, 2] },
    ];
    saveCourseData(courses);
    const loaded = loadCourseData();
    expect(loaded).toEqual(courses);
  });
});