"use client";

import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

const loginBackgroundImageSrc = "/images/auth/login-background.png";
const fitAiLogoImageSrc = "/images/auth/fit-ai-logo.svg";
const googleLogoImageSrc = "/images/auth/google-logo.svg";

export const LoginScreen = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const isCheckingSession = isPending;
  const isAuthenticated = Boolean(session);
  const isBusy = isCheckingSession || isSigningIn || isAuthenticated;

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, router, session]);

  const handleGoogleSignIn = async () => {
    setAuthErrorMessage(null);
    setIsSigningIn(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/auth",
    });

    if (error) {
      setAuthErrorMessage(
        error.message || "Não foi possível iniciar o login com o Google.",
      );
      setIsSigningIn(false);
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center overflow-hidden bg-auth-background">
      <div className="relative flex min-h-svh w-full max-w-[402px] overflow-hidden bg-auth-background">
        <div className="absolute inset-0">
          <Image
            alt=""
            className="object-cover object-[34%_center]"
            fill
            priority
            sizes="(max-width: 402px) 100vw, 402px"
            src={loginBackgroundImageSrc}
          />
        </div>

        <div className="absolute left-1/2 top-12 z-10 -translate-x-1/2">
          <Image
            alt="FIT.AI"
            height={38}
            priority
            src={fitAiLogoImageSrc}
            width={85}
          />
        </div>

        <section className="relative z-10 mt-auto flex w-full flex-col gap-[60px] rounded-t-[20px] bg-auth-sheet px-5 pb-10 pt-12">
          <div className="flex flex-col items-center gap-6">
            <h1 className="w-full text-center font-heading text-[32px] leading-[1.05] font-semibold text-background">
              O app que vai transformar a forma como você treina.
            </h1>

            <Button
              className="h-[38px] rounded-full bg-background px-6 text-[14px] font-semibold text-foreground hover:bg-background/90"
              disabled={isBusy}
              onClick={handleGoogleSignIn}
              type="button"
            >
              {isBusy ? (
                <LoaderCircle
                  className="size-4 animate-spin"
                  data-icon="inline-start"
                />
              ) : (
                <Image
                  alt=""
                  height={16}
                  src={googleLogoImageSrc}
                  width={16}
                />
              )}
              Fazer login com Google
            </Button>

            {authErrorMessage ? (
              <p
                className="max-w-[320px] text-center text-sm text-background"
                role="alert"
              >
                {authErrorMessage}
              </p>
            ) : null}
          </div>

          <p className="text-center font-heading text-[12px] leading-[1.4] text-background/70">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </section>
      </div>
    </main>
  );
};
