"use client";

import { usePathname } from "next/navigation";
import { NAVIGATION } from "../../../app/exercises/navigation.const";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LinkCard } from "./link-card";

export const AutoNavigationCard = () => {
  const pathname = usePathname().split("/");

  console.log({
    length: pathname.length,
    split: pathname,
  });

  if (pathname.length === 4) {
    const [_1, _2, sectionPath, lessonPath] = pathname;
    const section = NAVIGATION.find((section) => section.path === sectionPath);
    const lesson = section?.items.find((item) => item.path === lessonPath);

    if (!section || !lesson) {
      return null;
    }

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {section?.title} - {lesson?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 lg:gap-4">
              <LinkCard
                key={lesson.path}
                text="Code"
                href={`/exercises/${section.path}/${lesson.path}/code`}
              />
              <LinkCard
                key={lesson.path}
                text="Solution"
                href={`/exercises/${section.path}/${lesson.path}/final`}
              />
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pathname.length === 3) {
    const [_1, _2, sectionPath] = pathname;
    const section = NAVIGATION.find((section) => section.path === sectionPath);

    if (!section) {
      return null;
    }

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 lg:gap-4">
              {section.items.map((item) => (
                <LinkCard
                  key={item.path}
                  text={item.title}
                  href={`/exercises/${section.path}/${item.path}`}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {NAVIGATION.map((section) => (
        <LinkCard
          key={section.path}
          text={section.title}
          href={`/exercises/${section.path}`}
        />
      ))}
    </div>
  );
};
