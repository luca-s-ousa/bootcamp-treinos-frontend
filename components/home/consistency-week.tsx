import dayjs from "dayjs";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";

type WeekDayKey =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

const weekDays = [
  { key: "MONDAY", label: "S" },
  { key: "TUESDAY", label: "T" },
  { key: "WEDNESDAY", label: "Q" },
  { key: "THURSDAY", label: "Q" },
  { key: "FRIDAY", label: "S" },
  { key: "SATURDAY", label: "S" },
  { key: "SUNDAY", label: "D" },
] as const;

const weekDayByDayIndex: WeekDayKey[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const weekDayAliases: Record<WeekDayKey, string[]> = {
  MONDAY: ["monday", "mon", "segunda", "segunda-feira", "seg"],
  TUESDAY: ["tuesday", "tue", "terca", "terca-feira", "ter"],
  WEDNESDAY: ["wednesday", "wed", "quarta", "quarta-feira", "qua"],
  THURSDAY: ["thursday", "thu", "quinta", "quinta-feira", "qui"],
  FRIDAY: ["friday", "fri", "sexta", "sexta-feira", "sex"],
  SATURDAY: ["saturday", "sat", "sabado", "sabado-feira", "sab"],
  SUNDAY: ["sunday", "sun", "domingo", "dom"],
};

const normalizeConsistencyKey = (key: string) => {
  return key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
};

const getWeekDayFromConsistencyKey = (key: string) => {
  const normalizedKey = normalizeConsistencyKey(key);
  const weekDay = weekDays.find((item) => {
    return weekDayAliases[item.key].includes(normalizedKey);
  });

  if (weekDay) {
    return weekDay.key;
  }

  const date = dayjs(key);

  if (!date.isValid()) {
    return undefined;
  }

  return weekDayByDayIndex[date.day()];
};

const getConsistencyStatusForDay = (
  consistencyByDay: GetHomeData200ConsistencyByDay,
  weekDay: WeekDayKey,
) => {
  return Object.entries(consistencyByDay).reduce(
    (status, [key, consistency]) => {
      if (getWeekDayFromConsistencyKey(key) !== weekDay) {
        return status;
      }

      return {
        hasCompleted:
          status.hasCompleted || consistency.workoutDayCompleted,
        hasStarted: status.hasStarted || consistency.workoutDayStarted,
      };
    },
    {
      hasCompleted: false,
      hasStarted: false,
    },
  );
};

export type ConsistencyWeekProps = {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  workoutStreak: number;
};

export const ConsistencyWeek = ({
  consistencyByDay,
  workoutStreak,
}: ConsistencyWeekProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <div className="flex min-h-[83px] flex-1 items-center justify-between rounded-xl border border-home-border p-5">
        {weekDays.map((weekDay) => {
          const { hasCompleted, hasStarted } = getConsistencyStatusForDay(
            consistencyByDay,
            weekDay.key,
          );
          const isCompleted = hasCompleted;
          const isInProgress = hasStarted && !hasCompleted;

          return (
            <div className="flex flex-col items-center gap-1.5" key={weekDay.key}>
              <div
                className={cn(
                  "size-5 rounded-md border border-home-border bg-background",
                  isInProgress && "border-primary bg-home-primary-muted",
                  isCompleted && "border-primary bg-primary",
                )}
              />
              <span className="font-heading text-xs leading-[1.4] text-home-muted-text">
                {weekDay.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex min-h-[83px] items-center gap-2 rounded-xl bg-home-streak px-5 py-2">
        <Flame className="size-5 fill-home-streak-icon text-home-streak-icon" />
        <span className="font-heading text-base leading-[1.15] font-semibold text-foreground">
          {workoutStreak}
        </span>
      </div>
    </div>
  );
};
