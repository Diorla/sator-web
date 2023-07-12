import useTheme from "../context/theme/useTheme";

export interface TypographyProps
  extends React.HTMLProps<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {
  type?: "h1" | "h2" | "h3" | "text" | "label";
}

export default function Typography({
  type,
  children,
  ...props
}: TypographyProps) {
  const {
    font: { h1, h2, h3, text },
  } = useTheme();

  // const {size, weight, style } = h1;
  if (type === "h1") {
    return (
      <h1 {...props}>
        {children}
        <style jsx>{`
          h1 {
            font-size: ${h1.size};
            font-style: ${h1.style};
            font-weight: ${h1.weight};
            line-height: normal;
          }
        `}</style>
      </h1>
    );
  }
  if (type === "h2") {
    return (
      <h1 {...props}>
        {children}
        <style jsx>{`
          h1 {
            font-size: ${h2.size};
            font-style: ${h2.style};
            font-weight: ${h2.weight};
            line-height: normal;
          }
        `}</style>
      </h1>
    );
  }
  if (type === "h3") {
    return (
      <h1 {...props}>
        {children}
        <style jsx>{`
          h1 {
            font-size: ${h3.size};
            font-style: ${h3.style};
            font-weight: ${h3.weight};
            line-height: normal;
          }
        `}</style>
      </h1>
    );
  }
  return (
    <div {...props}>
      {children}
      <style jsx>{`
        div {
          font-size: ${text.size};
          font-style: ${text.style};
          font-weight: ${text.weight};
          line-height: normal;
        }
      `}</style>
    </div>
  );
}
