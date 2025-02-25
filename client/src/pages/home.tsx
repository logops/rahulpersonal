import { Card, CardContent } from "@/components/ui/card";
import { FaTwitter } from "react-icons/fa";
import { Link } from "wouter";

export default function Home() {
  const links = [
    { href: "/work", label: "Work" },
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
    { href: "/photos", label: "Photos" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-[#004225]">
      <h1 className="text-5xl font-poppins font-bold mb-8 text-white">
        Rahul Joshi
      </h1>

      <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {links.map(link => (
          <Link key={link.href} href={link.href}>
            <a className="text-2xl md:text-3xl text-white hover:text-white/80 transition-colors duration-200 font-roboto font-bold">
              {link.label}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}