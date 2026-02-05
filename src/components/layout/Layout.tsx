import { Header } from "./Header";
import { Footer } from "./Footer";
import { CursorTracker } from "@/components/3d";
import { Background3D } from "@/components/3d";

interface LayoutProps {
  children: React.ReactNode;
  showBackground3D?: boolean;
}

export function Layout({ children, showBackground3D = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CursorTracker />
      {showBackground3D && <Background3D />}
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
