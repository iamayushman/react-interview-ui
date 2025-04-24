import { Control, FieldValues, Path } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: "text" | "number";
  rows?: number;
  disabled?: boolean;
}
