import { useState } from "react";
import Task, { Priority } from "../../models/Task";
import useUser from "../../context/user/useUser";
import Input from "../../components/Input";
import TimeInput from "../../components/TimeInput";
import createTask from "../../services/createTask";
import { initialTask } from ".";

export default function NoTask() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();

  const [form, setForm] = useState<Task>({ ...initialTask, userId: user.id });

  return (
    <div>
      <h1>No tasks</h1>
      <button onClick={() => setDialogOpen(true)}>Add task</button>
      <dialog open={dialogOpen}>
        <div>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TimeInput
            label="Weekly quota"
            value={form.weeklyQuota}
            onChangeValue={(weeklyQuota) => setForm({ ...form, weeklyQuota })}
          />
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Input
              type="color"
              label="Color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="priority">Select priority</label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as unknown as Priority,
                  })
                }
              >
                <option value={Priority.None}>None</option>
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => setDialogOpen(false)}>Close</button>
          <button
            onClick={() => {
              createTask(form);
              setForm({ ...initialTask, userId: user.id });
              setDialogOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </dialog>
    </div>
  );
}
