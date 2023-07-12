import useTheme from "../context/theme/useTheme";

export interface LabelProps
  extends React.HTMLProps<HTMLLabelElement>,
    React.HTMLAttributes<HTMLLabelElement> {}
export default function Label({ children, ...props }: LabelProps) {
  const { font } = useTheme();
  return (
    <label {...props}>
      {children}
      <style jsx>{`
        label {
          font-size: ${font.text.size}px;
          text-align: start;
          margin-bottom: 5px;
          flex: 1;
        }
      `}</style>
    </label>
  );
}
