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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                href={`/exercises/${section.path}/${lesson.path}/code`}
              >
                Code
              </LinkCard>
              <LinkCard
                key={lesson.path}
                href={`/exercises/${section.path}/${lesson.path}/final`}
              >
                Solution
              </LinkCard>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pathname.length === 3) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                  href={`/exercises/${section.path}/${item.path}`}
                >
                  {item.title}
                </LinkCard>
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
        <LinkCard key={section.path} href={`/exercises/${section.path}`}>
          {section.title}
        </LinkCard>
      ))}
    </div>
  );
};
