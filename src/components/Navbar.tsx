
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  FileEdit,
  BarChart3,
  MessageCircle,
  Palette,
  Settings,
  Search,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", href: "/home", icon: LayoutDashboard },
    { label: "Posts", href: "/posts", icon: BookOpen },
    { label: "Create Post", href: "/create-post", icon: FileEdit },
    { label: "Statistics", href: "/statistics", icon: BarChart3 },
    { label: "Comments", href: "/comments", icon: MessageCircle },
    { label: "Theme", href: "/theme", icon: Palette },
  ];

  return (
    <header className={cn("border-b bg-background sticky top-0 z-50", className)}>
      <div className="container px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/home" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span className="text-brand">Blog</span>
                <span className="text-foreground">Nexus</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search posts..."
                className="w-[240px] rounded-md border border-input bg-background px-9 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="py-4 md:hidden">
            <ul className="grid gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search posts..."
                    className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
