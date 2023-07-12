import colors from "../constants/colors";
import useTheme from "../context/theme/useTheme";

export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement>,
    React.HTMLAttributes<HTMLButtonElement> {
  mode?: "contained" | "text";
  color?: keyof typeof colors;
  type?: "button" | "submit" | "reset";
}
export default function Button({
  mode = "contained",
  color = "primary",
  children,
  ...props
}: ButtonProps) {
  const { palette, font, mode: themeMode } = useTheme();
  return (
    <button {...props}>
      {children}
      <style jsx>{`
        button {
          background-color: ${mode === "contained"
            ? palette[color].main
            : "transparent"};
          color: ${mode === "contained"
            ? palette[color].text
            : palette[color].main};
          text-align: center;
          font-size: ${font.text};
          cursor: pointer;
          padding: 5px 15px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: ${mode === "contained"
            ? palette[color].dark
            : "transparent"};
          color: ${mode === "contained"
            ? palette[color].text
            : palette[color].light};
        }
        button:active {
          background-color: ${mode === "contained"
            ? palette[color].dark
            : "transparent"};
          color: ${mode === "contained"
            ? palette[color].text
            : palette[color].dark};
        }
      `}</style>
    </button>
  );
}
