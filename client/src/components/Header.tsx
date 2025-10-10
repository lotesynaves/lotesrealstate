import { Building2, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Acerca de Nosotros' },
    // { href: "/propiedades", label: "Propiedades" },
    // { href: "/blog", label: "Blog" },
    // { href: "/contacto", label: "Contacto" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
          <span className="text-xl font-bold hidden sm:inline text-gray-900 dark:text-white">NavesIndustriales</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location === item.href 
                    ? "text-blue-600 dark:text-blue-400 font-semibold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                    <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        location === item.href 
                          ? "text-blue-600 dark:text-blue-400 font-semibold" 
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
