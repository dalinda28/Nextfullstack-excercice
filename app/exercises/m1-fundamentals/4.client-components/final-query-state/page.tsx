import { Card } from "@/components/ui/card";
import { VEGETABLES } from "../data.const";
import { InputSearch } from "./input-search";

export default async function RoutePage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams.q ?? "";

  const filterVegetables = VEGETABLES.filter((v) =>
    v.toLowerCase().includes(query.toLocaleLowerCase())
  );

  console.log("Render With Filter", { query });

  return (
    <Card className="p-6 flex">
      <div className="w-full">
        <InputSearch defaultState={query} />
        <ul className="flex flex-col divide-y divide-accent mt-8">
          {filterVegetables.map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
