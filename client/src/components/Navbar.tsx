import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/articles", label: "Articles" },
  { href: "/show-my-space", label: "Show My Space" },
  { href: "/visualizer", label: "AI Visualizer" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-charcoal-dark/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: "#C9A84C" }}>
              <span className="text-charcoal-dark font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-wide">
              A-Team<span style={{ color: "#C9A84C" }}> Repair Solutions</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                style={location === link.href ? { color: "#C9A84C" } : undefined}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+12153034494"
              className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" style={{ color: "#C9A84C" }} />
              (215) 303-4494
            </a>
            <Link href="/schedule">
              <Button
                size="sm"
                data-testid="button-schedule-estimate-nav"
                style={{ background: "#C9A84C", color: "#1C1C1E", borderColor: "#C9A84C" }}
                className="font-semibold hover:opacity-90"
              >
                Free Estimate
              </Button>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-white"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-charcoal-dark border-white/10"
            >
              <div className="flex flex-col h-full py-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-lg font-bold text-white">
                    A-Team<span style={{ color: "#C9A84C" }}> Repair Solutions</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 text-base font-medium rounded-md transition-colors block ${
                        location === link.href
                          ? "bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      style={location === link.href ? { color: "#C9A84C" } : undefined}
                      onClick={() => setOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="tel:+12153034494"
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <Phone className="w-4 h-4" style={{ color: "#C9A84C" }} />
                    (215) 303-4494
                  </a>
                  <Link href="/schedule">
                    <Button
                      className="w-full font-semibold"
                      style={{ background: "#C9A84C", color: "#1C1C1E" }}
                      onClick={() => setOpen(false)}
                      data-testid="button-schedule-mobile"
                    >
                      Book Free Estimate
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
