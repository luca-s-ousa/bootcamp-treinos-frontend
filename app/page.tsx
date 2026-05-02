import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { getHomeData } from "./_lib/api/fetch-generated";
import dayjs from "dayjs";

export default async function HomeScreen() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) return redirect("/auth");

  const homeData = await getHomeData(dayjs().format("YYYY-MM-DD"));
  console.log(homeData);

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-6 py-10">
      <Card className="w-full max-w-xl border border-border bg-card py-0 shadow-sm">
        <CardHeader className="border-b border-border px-6 py-6">
          <CardTitle className="text-2xl">Bem-vindo ao FIT.AI</CardTitle>
          <CardDescription>
            Sua sessão foi validada com sucesso e a página inicial está
            protegida.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Usuário autenticado</p>
            <p className="text-base font-medium text-foreground">
              {session.data?.user.name || session.data?.user.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {session.data?.user.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
