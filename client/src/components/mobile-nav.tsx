import { Link, useLocation } from "wouter";
import { Home, Briefcase, PenTool, FolderGit2, Camera, Settings } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/work", icon: Briefcase, label: "Work" },
    { href: "/writing", icon: PenTool, label: "Writing" },
    { href: "/projects", icon: FolderGit2, label: "Projects" },
    { href: "/photos", icon: Camera, label: "Photos" },
    { href: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="grid grid-cols-6 gap-1 p-2">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <a className={`
              flex flex-col items-center justify-center p-2 rounded-md
              ${location === href ? 'text-primary' : 'text-muted-foreground'}
              hover:text-primary transition-colors
            `}>
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}