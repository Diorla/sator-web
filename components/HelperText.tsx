import useTheme from "../context/theme/useTheme";

export interface HelperTextProps
  extends React.HTMLProps<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {
  isError?: boolean;
}
export default function HelperText({
  children,
  isError,
  ...props
}: HelperTextProps) {
  const { palette, font, main } = useTheme();
  return (
    <div {...props}>
      {children}
      <style jsx>{`
        div {
          font-size: ${font.small.size}px;
          text-align: start;
          color: ${isError ? palette.error.main : palette.shade.main};

      `}</style>
    </div>
  );
}
