import Schedule from "./Schedule";

type RenderSchedule = Schedule & {
  todayTime: number;
  overflow?: boolean;
};
export default RenderSchedule;
