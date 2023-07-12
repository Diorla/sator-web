import { useEffect, useState } from "react";
import useTheme from "../context/theme/useTheme";
import Label from "./Label";
import HelperText from "./HelperText";
import minuteToArr from "../utils/minuteToArr";

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
  const { palette, font } = useTheme();
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
      <Label htmlFor={id}>{label}</Label>
      <HelperText>{helperText}</HelperText>
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
      <style jsx>{`
        .input {
          text-align: center;
          font-size: ${font.text.size}px;
          padding: 5px 15px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 1px solid ${palette.shade.light};
          text-align: start;
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          display: flex;
        }
        input {
          border: none;
          outline: none;
          flex: 1;
        }
        input:focus {
          border: 1px solid ${palette.shade.main};
          outline: none;
        }
        div {
          display: flex;
          flex-direction: column;
        }
        label {
          font-size: ${font.text.size};
          text-align: start;
          margin-bottom: 5px;
        }
        .time-input {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
