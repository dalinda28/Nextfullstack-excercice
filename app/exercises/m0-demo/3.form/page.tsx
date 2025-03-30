import FormMelvynx from "./form-melvynx";
import FormShadcn from "./form-shadcn";

export default function FormPage() {
  return (
    <div className="space-y-12 py-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Form with Shadcn</h1>
        <FormShadcn />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">
          Form with Melvynx Custom Form
        </h1>
        <FormMelvynx />
      </div>
    </div>
  );
}
