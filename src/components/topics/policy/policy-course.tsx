import { CourseIntro } from "./course/course-intro";
import { CourseChallenges } from "./course/course-challenges";
import { CoursePolicyPolitics } from "./course/course-policy-politics";
import { CourseMatrix } from "./course/course-matrix";
import { CourseStoryline } from "./course/course-storyline";

/**
 * Course module "השפעה ומדיניות" (Liat Cohen Raviv) - a summary of the policy &
 * influence session the cohort studied, rebuilt as native portal content.
 * Each section is its own focused component.
 */
export function PolicyCourse() {
  return (
    <>
      <CourseIntro />
      <CourseChallenges />
      <CoursePolicyPolitics />
      <CourseMatrix />
      <CourseStoryline />
    </>
  );
}
