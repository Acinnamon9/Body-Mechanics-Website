import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { 
  Menu,
  Dumbbell, 
  Users, 
  CalendarDays, 
  CreditCard, 
  Warehouse, 
  Info, 
  Phone, 
  User as UserIcon,
  LogOut,
  X,
  Menu as MenuIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Dumbbell className="w-4 h-4 mr-2" /> },
    { name: "Classes", path: "/classes", icon: <CalendarDays className="w-4 h-4 mr-2" /> },
    { name: "Trainers", path: "/trainers", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Membership", path: "/membership", icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: "Facilities", path: "/facilities", icon: <Warehouse className="w-4 h-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="w-4 h-4 mr-2" /> },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-muted border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <a className="text-secondary font-accent text-3xl tracking-wider">BODY MECHANICS</a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={`nav-link text-foreground font-medium text-sm hover:text-secondary transition-colors ${
                    isActiveLink(item.path) ? "text-secondary" : ""
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => window.location.href = "/api/logout"}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"} 
                variant="secondary"
                className="font-medium"
              >
                Login
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <div className="text-secondary font-accent text-3xl tracking-wider">BODY MECHANICS</div>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a 
                    className={`flex items-center text-lg font-medium ${
                      isActiveLink(item.path) ? "text-secondary" : "text-foreground"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </Link>
              ))}
              
              {isAuthenticated && (
                <>
                  <Link href="/dashboard">
                    <a 
                      className="flex items-center text-lg font-medium text-foreground"
                      onClick={closeMobileMenu}
                    >
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/profile">
                    <a 
                      className="flex items-center text-lg font-medium text-foreground"
                      onClick={closeMobileMenu}
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </a>
                  </Link>
                  <a 
                    href="/api/logout"
                    className="flex items-center text-lg font-medium text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </a>
                </>
              )}
              
              {!isAuthenticated && (
                <Button 
                  onClick={() => window.location.href = "/api/login"} 
                  variant="secondary"
                  className="font-medium w-full"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
