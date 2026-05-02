import Link from "next/link";
import {
  Calendar,
  ChartNoAxesColumn,
  House,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const NavigationBar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-[393px] items-center justify-center gap-6 rounded-t-[20px] border border-home-border bg-background px-6 py-4">
      <Button asChild className="size-12 bg-transparent p-0 text-foreground hover:bg-muted" variant="ghost">
        <Link aria-label="Home" href="/">
          <House className="size-6" />
        </Link>
      </Button>

      <Button aria-label="Calendário" className="size-12 bg-transparent p-0 text-home-toolbar-icon hover:bg-muted" type="button" variant="ghost">
        <Calendar className="size-6" />
      </Button>

      <Button aria-label="FIT.AI" className="size-14 rounded-full bg-primary p-0 text-primary-foreground hover:bg-primary/90" type="button">
        <Sparkles className="size-6" />
      </Button>

      <Button aria-label="Estatísticas" className="size-12 bg-transparent p-0 text-home-toolbar-icon hover:bg-muted" type="button" variant="ghost">
        <ChartNoAxesColumn className="size-6" />
      </Button>

      <Button aria-label="Perfil" className="size-12 bg-transparent p-0 text-home-toolbar-icon hover:bg-muted" type="button" variant="ghost">
        <UserRound className="size-6" />
      </Button>
    </nav>
  );
};
