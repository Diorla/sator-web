import days from "../constants/days";
import toggleItem from "../utils/toggleItem";
import Button from "@mui/material/Button";
import { FormHelperText, FormLabel } from "@mui/material";

export default function DaySelector({
  daysSelected,
  label,
  error,
  onChange,
}: {
  daysSelected: number[];
  label: string;
  error?: string;
  onChange: (days: number[]) => void;
}) {
  return (
    <div className="container">
      <FormLabel>{label}</FormLabel>
      <FormHelperText>The days you want to work on</FormHelperText>
      <div className="days">
        {days.map((day, index) => (
          <Button
            key={day}
            variant={daysSelected.includes(index) ? "contained" : "outlined"}
            onClick={() => onChange(toggleItem(daysSelected, index))}
          >
            {day}
          </Button>
        ))}
      </div>
      {error && (
        <FormHelperText style={{ color: "red" }}>{error}</FormHelperText>
      )}
    </div>
  );
}
