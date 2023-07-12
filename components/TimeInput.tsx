import { useEffect, useState } from "react";
import minuteToArr from "../utils/minuteToArr";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

export interface InputProps
  extends React.HTMLProps<HTMLInputElement>,
    React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  value: number;
  onChangeValue: (value: number) => void;
}
export default function TimeInput({
  label,
  helperText,
  children,
  value,
  onChangeValue,
  style,
  ...props
}: InputProps) {
  const [id, setId] = useState("");
  useEffect(() => {
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setId(id);
  }, []);

  const [h, m] = minuteToArr(value);
  return (
    <div style={style}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormHelperText>{helperText}</FormHelperText>
      <div className="time-input">
        <div className="input">
          <input
            {...props}
            id={id}
            value={h}
            onChange={(e) => {
              const num = Number(e.target.value);
              onChangeValue(num * 60 + m);
            }}
          />
          hours
        </div>
        <div className="input">
          <input
            {...props}
            id={id}
            value={m}
            onChange={(e) => {
              const num = Number(e.target.value);
              onChangeValue(h * 60 + num);
            }}
          />
          minutes
        </div>
      </div>
      {children}
    </div>
  );
}
