import { useEffect, useState } from "react";
import useTheme from "../context/theme/useTheme";
import Label from "./Label";
import HelperText from "./HelperText";

export interface InputProps
  extends React.HTMLProps<HTMLInputElement>,
    React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}
export default function Input({
  label,
  children,
  helperText,
  ...props
}: InputProps) {
  const { palette, font } = useTheme();
  const [id, setId] = useState("");
  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 15);
    setId(id);
  }, []);

  return (
    <div className="container">
      <Label htmlFor={id}>{label}</Label>
      <HelperText>{helperText}</HelperText>
      <input {...props} id={id} />
      {children}
      <style jsx>{`
        input {
          text-align: center;
          font-size: ${font.text};
          padding: 5px 15px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 1px solid ${palette.shade.light};
          text-align: start;
        }
        input:focus {
          border: 1px solid ${palette.shade.main};
          outline: none;
        }
        .container {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
