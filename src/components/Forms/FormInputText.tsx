import { Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "../../types/form-input-props";

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  rows = 1,
  disabled = false,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="medium"
          style={{ marginBottom: 16 }}
          error={!!error}
          value={value}
          disabled={disabled}
          fullWidth
          label={label}
          variant="standard"
          type={type}
          multiline={rows > 1}
          rows={rows}
          InputProps={{
            inputProps: type === "number" ? { inputMode: "numeric" } : {},
          }}
          onChange={(e) => {
            const val =
              type === "number"
                ? e.target.value === ""
                  ? ""
                  : +e.target.value
                : e.target.value;
            onChange(val);
          }}
        />
      )}
    />
  );
};
