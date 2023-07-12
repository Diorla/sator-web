import { useState } from "react";
import Input from "../../components/Input";
import TimeInput from "../../components/TimeInput";
import Typography from "../../components/Typography";
import useTheme from "../../context/theme/useTheme";
import User from "../../models/User";
import useUser from "../../context/user/useUser";
import DaySelector from "../../components/DaySelector";
import Button from "../../components/Button";
import createUser from "../../services/createUser";

export default function Welcome() {
  const { breakpoints } = useTheme();
  const {
    user: { id, email },
  } = useUser();
  const [form, setForm] = useState<User>({
    name: "",
    id,
    email,
    weeklyQuota: 0,
    activeDays: [],
    dailyMax: 0,
    record: {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
    timer: [],
  });
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: breakpoints.sm,
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography type="h1" style={{ marginBottom: 8 }}>
        Welcome
      </Typography>
      <Typography style={{ marginBottom: 8 }}>
        To continue, please provide the following information
      </Typography>
      <Input
        label="First Name"
        helperText="What should we call you?"
        style={{ marginBottom: 8 }}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setForm({ ...form, name: target.value });
        }}
      />
      <TimeInput
        value={form.weeklyQuota}
        onChangeValue={(weeklyQuota) => setForm({ ...form, weeklyQuota })}
        label="Weekly Hours"
        helperText="How many hours do you want to use every week?"
        style={{ marginBottom: 8 }}
      />
      <TimeInput
        value={form.dailyMax}
        onChangeValue={(dailyMax) => setForm({ ...form, dailyMax })}
        label="Daily max"
        helperText="Ideal amount of time you want to spend on a task"
        style={{ marginBottom: 8 }}
      />
      <DaySelector
        daysSelected={form.activeDays}
        color="primary"
        label="Active days"
        onChange={(activeDays) => setForm({ ...form, activeDays })}
      />
      <Button onClick={() => createUser(form)} style={{ marginTop: 16 }}>
        Continue
      </Button>
    </div>
  );
}
