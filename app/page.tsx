import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { authClient } from "@/app/_lib/auth-client";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { Button } from "@/components/ui/button";
import { ConsistencyWeek } from "@/components/home/consistency-week";
import { NavigationBar } from "@/components/home/navigation-bar";
import { WorkoutDayCard } from "@/components/home/workout-day-card";

export const dynamic = "force-dynamic";

const bannerImageSrc = "/images/home/banner.jpg";

const getFirstName = (name?: string | null, email?: string | null) => {
  const displayName = name || email || "Atleta";
  return displayName.split(" ")[0];
};

export default async function HomePage() {
  const today = dayjs().format("YYYY-MM-DD");
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const homeDataResponse = await getHomeData(today, {
    cache: "no-store",
  });

  if (homeDataResponse.status === 401) {
    redirect("/auth");
  }

  if (homeDataResponse.status !== 200) {
    throw new Error("Não foi possível carregar os dados da home.");
  }

  const homeData = homeDataResponse.data;
  const firstName = getFirstName(
    session.data.user.name,
    session.data.user.email,
  );
  const todayWorkoutDay = homeData.todayWorkoutDay;
  const todayWorkoutDayCard = todayWorkoutDay ? (
    <WorkoutDayCard
      coverImageUrl={todayWorkoutDay.coverImageUrl}
      estimatedDurationInSeconds={
        todayWorkoutDay.estimatedDurationInSeconds
      }
      exercisesCount={todayWorkoutDay.exercisesCount}
      isRest={todayWorkoutDay.isRest}
      name={todayWorkoutDay.name}
      weekDay={todayWorkoutDay.weekDay}
    />
  ) : null;

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[393px] flex-col bg-background pb-28">
      <section className="relative flex h-[296px] flex-col justify-between overflow-hidden rounded-b-[20px] px-5 pt-5 pb-10">
        <Image
          alt=""
          className="object-cover object-[50%_30%]"
          fill
          priority
          sizes="(max-width: 430px) 100vw, 393px"
          src={bannerImageSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/45 to-transparent" />

        <p className="relative z-10 font-brand text-[22px] leading-[1.15] text-background uppercase">
          Fit.ai
        </p>

        <div className="relative z-10 flex w-full items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-2xl leading-[1.05] font-semibold text-background">
              Olá, {firstName}
            </h1>
            <p className="font-heading text-sm leading-[1.15] text-background/70">
              Bora treinar hoje?
            </p>
          </div>

          <Button
            className="h-[38px] rounded-full px-4 font-heading text-sm font-semibold"
            type="button"
          >
            Bora!
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
            Consistência
          </h2>
          <Button
            className="h-auto p-0 font-heading text-xs font-normal text-primary hover:bg-transparent"
            type="button"
            variant="ghost"
          >
            Ver histórico
          </Button>
        </div>

        <ConsistencyWeek
          consistencyByDay={homeData.consistencyByDay}
          workoutStreak={homeData.workoutStreak}
        />
      </section>

      <section className="flex w-full flex-col gap-3 rounded-tr-lg p-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
            Treino de Hoje
          </h2>
          <Button
            className="h-auto p-0 font-heading text-xs font-normal text-primary hover:bg-transparent"
            type="button"
            variant="ghost"
          >
            Ver treinos
          </Button>
        </div>

        {todayWorkoutDay ? (
          todayWorkoutDay.isRest ? (
            todayWorkoutDayCard
          ) : (
            <Link aria-label={`Treino de hoje: ${todayWorkoutDay.name}`} href="#">
              {todayWorkoutDayCard}
            </Link>
          )
        ) : (
          <div className="flex h-[200px] w-full flex-col justify-end rounded-xl border border-home-border bg-muted p-5">
            <h3 className="font-heading text-2xl leading-[1.05] font-semibold text-foreground">
              Nenhum treino hoje
            </h3>
            <p className="mt-2 font-heading text-sm leading-[1.4] text-muted-foreground">
              Seu treino do dia aparecerá aqui quando estiver disponível.
            </p>
          </div>
        )}
      </section>

      <NavigationBar />
    </main>
  );
}
