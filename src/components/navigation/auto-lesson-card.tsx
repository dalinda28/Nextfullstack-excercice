"use client";

import { usePathname } from "next/navigation";
import { NavigationItem } from "../../../app/exercises/navigation.const";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LinkCard } from "./link-card";

export const AutoNavigationCard = ({
  navigation,
}: {
  navigation: NavigationItem[];
}) => {
  const pathname = usePathname().split("/");

  if (pathname.length === 4) {
    const [_1, _2, sectionPath, lessonPath] = pathname;
    const section = navigation.find((section) => section.path === sectionPath);
    const lesson = section?.items?.find((item) => item.path === lessonPath);

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
          <CardContent className="flex flex-col gap-2 lg:gap-4">
            <LinkCard href={`/exercises/${section.path}/${lesson.path}/code`}>
              Code
            </LinkCard>
            <LinkCard href={`/exercises/${section.path}/${lesson.path}/final`}>
              Solution
            </LinkCard>
            {lesson.items?.map((variant, i) => (
              <LinkCard
                key={variant.path + i}
                href={`/exercises/${section.path}/${lesson.path}/${variant.path}`}
              >
                {i + 1} {variant.title}
              </LinkCard>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pathname.length === 3) {
    const [_1, _2, sectionPath] = pathname;
    const section = navigation.find((section) => section.path === sectionPath);

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
              {section.items?.map((item, i) => (
                <LinkCard
                  key={item.path + i}
                  href={`/exercises/${section.path}/${item.path}`}
                >
                  {i + 1}. {item.title}
                </LinkCard>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      {navigation.map((section, i) => (
        <LinkCard key={section.path + i} href={`/exercises/${section.path}`}>
          {section.title}
        </LinkCard>
      ))}
    </div>
  );
};
