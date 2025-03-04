import { readdir } from "fs/promises";
import path from "path";

export interface NavigationItem {
  title: string;
  path: string;
  items?: NavigationItem[];
}

export async function getNavigations(): Promise<NavigationItem[]> {
  const exercisesDir = path.join(process.cwd(), "app/exercises");
  const entries = await readdir(exercisesDir, { withFileTypes: true });

  const modules = entries.filter(
    (entry) => entry.isDirectory() && entry.name.startsWith("m")
  );

  const navigation: NavigationItem[] = [];

  for (const moduleEntry of modules) {
    // Skip non-module directories
    if (!moduleEntry.name.match(/^m\d+-/)) continue;

    const [moduleId, ...moduleNameParts] = moduleEntry.name.split("-");
    const moduleName = moduleNameParts.join("-");
    const moduleNumber = moduleId.substring(1); // Remove the 'm' prefix

    const moduleDir = path.join(exercisesDir, moduleEntry.name);
    const moduleEntries = await readdir(moduleDir, { withFileTypes: true });

    // Find all directories that are lessons (start with a number)
    const lessons = moduleEntries.filter(
      (entry) => entry.isDirectory() && /^\d+\./.test(entry.name)
    );

    // Sort lessons by their number
    lessons.sort((a, b) => {
      const aNum = parseInt(a.name.split(".")[0]);
      const bNum = parseInt(b.name.split(".")[0]);
      return aNum - bNum;
    });

    const moduleItem: NavigationItem = {
      title: `M${moduleNumber} - ${capitalizeFirstLetter(moduleName)}`,
      path: moduleEntry.name,
      items: await Promise.all(
        lessons.map(async (lesson) => {
          const lessonNameParts = lesson.name.split(".").slice(1);
          const lessonName = lessonNameParts.join(".").replace(/-/g, " ");

          // Check if this lesson has any final-* variants
          const lessonDir = path.join(moduleDir, lesson.name);
          const lessonEntries = await readdir(lessonDir, {
            withFileTypes: true,
          });

          // Find all final-* directories
          const finalVariants = lessonEntries.filter(
            (entry) => entry.isDirectory() && entry.name.startsWith("final-")
          );

          const lessonItem: NavigationItem = {
            title: capitalizeFirstLetter(lessonName),
            path: lesson.name,
          };

          // Add final variants as subitems if they exist
          if (finalVariants.length > 0) {
            lessonItem.items = finalVariants.map((variant) => ({
              title: `Solution ${variant.name.replace("final-", "")}`,
              path: variant.name,
            }));
          }

          return lessonItem;
        })
      ),
    };

    navigation.push(moduleItem);
  }

  // Sort modules by their number
  navigation.sort((a, b) => {
    const aNum = parseInt(a.title.match(/M(\d+)/)?.[1] || "0");
    const bNum = parseInt(b.title.match(/M(\d+)/)?.[1] || "0");
    return aNum - bNum;
  });

  return navigation;
}

function capitalizeFirstLetter(string: string): string {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
