"use client";

import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { authClient } from "@/app/_lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeScreen = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  if (!session) return redirect("/auth");

  if (isPending || !session) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-muted px-6">
        <LoaderCircle className="size-8 animate-spin text-primary" />
      </main>
    );
  }

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
              {session.user.name || session.user.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomeScreen;
