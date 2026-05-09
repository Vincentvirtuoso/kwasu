import type { CourseResult } from "@kwasu-portal/types";

export function computeCGPA(results: CourseResult[]): number {
  const totalPoints = results.reduce(
    (sum, r) => sum + r.gradePoint * r.creditUnits,
    0,
  );
  const totalUnits = results.reduce((sum, r) => sum + r.creditUnits, 0);
  return totalUnits === 0
    ? 0
    : parseFloat((totalPoints / totalUnits).toFixed(2));
}

export function getClassOfDegree(cgpa: number): string {
  if (cgpa >= 4.5) return "First Class Honours";
  if (cgpa >= 3.5) return "Second Class Upper";
  if (cgpa >= 2.4) return "Second Class Lower";
  if (cgpa >= 1.5) return "Third Class";
  return "Pass";
}
