import { Accordion } from "@/components/accordion";
import { AlertDialog } from "@/components/alert-dialog";
import { Checkbox } from "@/components/checkbox";
import { CheckboxGroup } from "@/components/checkbox-group";
import { Collapsible } from "@/components/collapsible";

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-start gap-8">
      <Accordion.Root>
        <Accordion.Item title="What is Base UI?">
          Base UI is a library of high-quality unstyled React components for
          design systems and web apps.
        </Accordion.Item>
        <Accordion.Item title="How do I get started?">
          Head to the &ldquo;Quick start&rdquo; guide in the docs. If
          you&apos;ve used unstyled libraries before, you&apos;ll feel at home.
        </Accordion.Item>
      </Accordion.Root>
      <AlertDialog.Root>
        <AlertDialog.Trigger intent="danger">Discard draft</AlertDialog.Trigger>
        <AlertDialog.Content
          title="Discard draft?"
          description="You can't undo this action."
          confirmText="Discard"
          cancelText="Cancel"
          intent="danger"
        />
      </AlertDialog.Root>
      <Checkbox.Root defaultChecked label="Enable notifications" />
      <CheckboxGroup.Root
        label="Apples"
        defaultValue={["fuji-apple"]}
        options={[
          { value: "fuji-apple", label: "Fuji" },
          { value: "gala-apple", label: "Gala" },
          { value: "granny-smith-apple", label: "Granny Smith" },
        ]}
      />
      <Collapsible.Root>
        <Collapsible.Trigger>Recovery keys</Collapsible.Trigger>
        <Collapsible.Content>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
