import { TextField } from "@mui/material";
import React from "react";

interface FormFieldProps {
  label: string;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  placeholder: string;
  disabled: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  inputRef,
  placeholder,
  disabled,
  multiline = false,
  rows = 1,
}) => {
  return (
    <TextField
      label={label}
      inputRef={inputRef}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        sx: {
          bgcolor: "background.paper",
          boxShadow: 1,
          "&:hover": { boxShadow: 2 },
          "&.Mui-focused": { boxShadow: 3 },
        },
      }}
    />
  );
};

export default FormField;
