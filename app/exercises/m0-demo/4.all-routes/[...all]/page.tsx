export default async function AllRoutes(props: {
  params: Promise<{ all: string[] }>;
}) {
  const params = await props.params;
  return (
    <div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
