import { useEffect, useState } from "react";
import minuteToArr from "../utils/minuteToArr";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText, Grid, InputAdornment, TextField } from "@mui/material";

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
      <Grid sx={{ textAlign: "start", ml: 1 }}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </Grid>
      <FormHelperText sx={{ ml: 1 }}>{helperText}</FormHelperText>
      <Grid sx={{ display: "flex", pr: 1, pl: 1, flexWrap: "wrap" }}>
        <TextField
          id={id}
          InputProps={{
            endAdornment: <InputAdornment position="end">hr</InputAdornment>,
          }}
          size="small"
          type="number"
          sx={{ ml: 1, mr: 1, minWidth: 50, maxWidth: "40%" }}
          value={h}
          onChange={(e) => {
            const num = Number(e.target.value);
            onChangeValue(num * 60 + m);
          }}
        />
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
          size="small"
          type="number"
          sx={{ ml: 1, mr: 1, minWidth: 50, maxWidth: "40%" }}
          value={m}
          onChange={(e) => {
            const num = Number(e.target.value);
            onChangeValue(h * 60 + num);
          }}
        />
      </Grid>
      {children}
    </div>
  );
}
