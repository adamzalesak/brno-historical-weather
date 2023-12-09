import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export const SwitchField = ({
  label,
  field,
}: {
  label: string;
  field: any;
}) => {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">{label}</FormLabel>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  );
};
