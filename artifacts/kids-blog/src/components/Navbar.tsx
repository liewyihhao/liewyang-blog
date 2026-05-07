import { Link, useLocation } from "wouter";
import { BookOpen, Camera, Star, Video, Settings, Home } from "lucide-react";
import { useGetProfile } from "@workspace/api-client-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/memories", label: "Gallery", icon: Camera },
  { path: "/diary", label: "Diary", icon: BookOpen },
  { path: "/milestones", label: "Milestones", icon: Star },
  { path: "/videos", label: "Videos", icon: Video },
];

export function Navbar() {
  const [location] = useLocation();
  const profile = useGetProfile();
  const childName = profile.data?.childName ?? "Liew Yang";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl">🚗</span>
            <div>
              <div className="font-bold text-primary text-lg leading-tight">{childName}</div>
              <div className="text-xs text-muted-foreground leading-tight">Little Adventures</div>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} href={path}>
              <button
                data-testid={`nav-${label.toLowerCase()}`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location === path
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            </Link>
          ))}
        </div>

        <Link href="/admin">
          <button
            data-testid="nav-admin"
            className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Settings size={15} />
            Admin
          </button>
        </Link>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link key={path} href={path}>
            <button
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                location === path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
