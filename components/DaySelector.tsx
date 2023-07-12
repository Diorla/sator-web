import Label from "./Label";
import days from "../constants/days";
import HelperText from "./HelperText";
import toggleItem from "../utils/toggleItem";
import Button from "./Button";

export default function DaySelector({
  daysSelected,
  color,
  label,
  error,
  onChange,
}: {
  daysSelected: number[];
  color: "primary" | "secondary";
  label: string;
  error?: string;
  onChange: (days: number[]) => void;
}) {
  return (
    <div className="container">
      <Label>{label}</Label>
      <HelperText>The days you want to work on</HelperText>
      <div className="days">
        {days.map((day, index) => (
          <Button
            key={day}
            color={daysSelected.includes(index) ? color : "shade"}
            onClick={() => onChange(toggleItem(daysSelected, index))}
          >
            {day}
          </Button>
        ))}
      </div>
      {error && <HelperText isError>{error}</HelperText>}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .days {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
