import Button from "@mui/material/Button";
import { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ModalType } from "./Welcome";
import { Priority } from "../../models/Task";
import TimeInput from "../../components/TimeInput";
import createTask from "../../services/createTask";
import useUser from "../../context/user/useUser";

export const initial = {
  name: "",
  weeklyQuota: 0,
  description: "",
  priority: Priority.None,
  color: "#" + Math.floor(Math.random() * 16777215).toString(16),
};

export function TaskModal({ openModal }: { openModal: () => void }) {
  const [form, setForm] = useState(initial);
  const { user } = useUser();

  const [error, setError] = useState({ ...initial, weeklyQuota: "" });

  const onSubmit = () => {
    if (form.name.length < 3) {
      setError({ ...error, name: "Name must be at least 3 characters" });
      return;
    }
    if (form.weeklyQuota <= 0) {
      setError({ ...initial, weeklyQuota: "Please provide a weekly quota" });
      return;
    }
    console.log("form", form);

    createTask({
      ...form,
      icon: "",
      lastDone: 0,
      record: {},
      userId: user.id,
    }).then(openModal);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "20px",
        width: `clamp(320px, 80%, 540px)`,
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        New task
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        size="small"
        placeholder="Learn new skill"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        sx={{ marginTop: 1 }}
        helperText={error.name}
        error={!!error.name}
        required
        style={{ marginBottom: 10 }}
      />
      <TimeInput
        value={form.weeklyQuota}
        onChangeValue={(value) => setForm({ ...form, weeklyQuota: value })}
        label="Weekly quota"
        helperText={error.weeklyQuota}
        error={!!error.weeklyQuota}
      />

      <TextField
        label="Description"
        variant="outlined"
        size="small"
        placeholder="This is a superior form"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        sx={{ marginTop: 1 }}
        helperText={error.description}
        error={!!error.description}
        multiline
        style={{ marginTop: 10, marginBottom: 10 }}
      />

      <FormControl fullWidth>
        <InputLabel id="priority">Select priority</InputLabel>
        <Select
          labelId="priority"
          id="priority"
          value={form.priority}
          size="small"
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value as unknown as Priority,
            })
          }
        >
          <MenuItem value={Priority.None}>None</MenuItem>
          <MenuItem value={Priority.Low}>Low</MenuItem>
          <MenuItem value={Priority.Medium}>Medium</MenuItem>
          <MenuItem value={Priority.High}>High</MenuItem>
        </Select>
      </FormControl>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          type="color"
          label="Color"
          variant="outlined"
          size="small"
          placeholder="This is a superior form"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          sx={{ marginTop: 1, flex: 1 }}
        />
        <Button
          variant="text"
          onClick={() =>
            setForm({
              ...form,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            })
          }
          sx={{ mt: 1 }}
        >
          Randomise
        </Button>
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onSubmit} variant="contained" sx={{ mt: 1 }}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
