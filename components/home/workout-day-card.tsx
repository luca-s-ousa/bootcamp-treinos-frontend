import Image from "next/image";
import { Calendar, Dumbbell, Timer, Zap } from "lucide-react";
import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/app/_lib/api/fetch-generated";

const defaultCoverImageSrc = "/images/home/today-workout.png";

const weekDayLabels: Record<GetHomeData200TodayWorkoutDayWeekDay, string> =
  {
    MONDAY: "SEGUNDA",
    TUESDAY: "TERÇA",
    WEDNESDAY: "QUARTA",
    THURSDAY: "QUINTA",
    FRIDAY: "SEXTA",
    SATURDAY: "SÁBADO",
    SUNDAY: "DOMINGO",
  };

const formatDurationInMinutes = (durationInSeconds: number) => {
  return Math.max(1, Math.round(durationInSeconds / 60));
};

const getCoverImageSrc = (coverImageUrl?: string) => {
  if (coverImageUrl?.startsWith("/")) {
    return coverImageUrl;
  }

  return defaultCoverImageSrc;
};

export type WorkoutDayCardProps = {
  coverImageUrl?: string;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  isRest: boolean;
  name: string;
  weekDay: GetHomeData200TodayWorkoutDayWeekDay;
};

export const WorkoutDayCard = ({
  coverImageUrl,
  estimatedDurationInSeconds,
  exercisesCount,
  isRest,
  name,
  weekDay,
}: WorkoutDayCardProps) => {
  if (isRest) {
    return (
      <article className="flex h-[200px] w-full flex-col items-start justify-between rounded-xl bg-home-rest-bg p-5">
        <div className="flex items-center justify-center gap-1 rounded-full bg-foreground/8 px-2.5 py-[5px] backdrop-blur-[4px]">
          <Calendar className="size-3.5 text-foreground" />
          <span className="font-heading text-xs leading-none font-semibold text-foreground uppercase">
            {weekDayLabels[weekDay]}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Zap className="size-5 text-primary" />
          <h3 className="font-heading text-2xl leading-[1.05] font-semibold text-foreground">
            Descanso
          </h3>
        </div>
      </article>
    );
  }

  const durationInMinutes = formatDurationInMinutes(
    estimatedDurationInSeconds,
  );
  const exercisesLabel = exercisesCount === 1 ? "exercício" : "exercícios";

  return (
    <article className="relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl bg-foreground p-5">
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        sizes="(max-width: 430px) calc(100vw - 40px), 350px"
        src={getCoverImageSrc(coverImageUrl)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />

      <div className="relative z-10 flex items-center justify-center gap-1 rounded-full bg-background/20 px-2.5 py-1.5 backdrop-blur-sm">
        <Calendar className="size-3.5 text-background" />
        <span className="font-heading text-xs leading-none font-semibold text-background uppercase">
          {weekDayLabels[weekDay]}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-heading text-2xl leading-[1.05] font-semibold text-background">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-xs leading-[1.4] text-background/70">
          <span className="flex items-center gap-1">
            <Timer className="size-3.5" />
            {durationInMinutes}min
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="size-3.5" />
            {exercisesCount} {exercisesLabel}
          </span>
        </div>
      </div>
    </article>
  );
};
