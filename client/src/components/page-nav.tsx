import { Link, useLocation } from "wouter";

export default function PageNav() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
    { href: "/photos", label: "Photos" },
  ];

  return (
    <nav className="absolute top-4 right-4 flex items-center gap-6">
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <a className={`
            font-roboto text-sm font-bold
            ${location === link.href ? 'text-white' : 'text-white/70'}
            hover:text-white transition-colors
          `}>
            {link.label}
          </a>
        </Link>
      ))}
    </nav>
  );
}