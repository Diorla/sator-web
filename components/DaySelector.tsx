import days from "../constants/days";
import toggleItem from "../utils/toggleItem";
import Button from "@mui/material/Button";
import { FormHelperText, FormLabel, Grid } from "@mui/material";

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
    <div style={{ marginTop: 12 }}>
      <Grid sx={{ textAlign: "start", ml: 1 }}>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <FormHelperText sx={{ ml: 1 }}>
        The days you want to work on
      </FormHelperText>
      <div className="days">
        {days.map((day, index) => (
          <Button
            key={day}
            variant={daysSelected.includes(index) ? "contained" : "outlined"}
            onClick={() => onChange(toggleItem(daysSelected, index))}
            sx={{ m: 1 }}
            color="secondary"
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
