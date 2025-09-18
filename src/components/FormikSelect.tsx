import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}

interface FormikSelectProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function FormikSelect({
  name,
  label,
  options,
  placeholder,
  className,
  disabled,
  onChange,
}: FormikSelectProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className={twMerge("w-full", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select
        value={field.value || ""}
        onValueChange={(val) => {
          helpers.setValue(val);
          onChange?.(val);
        }}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger
          id={name}
          aria-invalid={!!(meta.touched && meta.error)}
          className="w-full"
        >
          <SelectValue placeholder={placeholder || "Select..."} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-xs text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
}
