import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/work", label: "Work" },
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
    { href: "/photos", label: "Photos" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-poppins font-bold">Rahul Joshi</a>
          </Link>

          <div className="flex items-center gap-6">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                <a className={`
                  font-roboto
                  ${location === link.href ? 'font-bold text-primary' : 'text-muted-foreground'}
                  hover:text-primary transition-colors
                `}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}