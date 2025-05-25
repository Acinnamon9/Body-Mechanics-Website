import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

// Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Pages
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Classes from "@/pages/classes";
import Trainers from "@/pages/trainers";
import Membership from "@/pages/membership";
import Facilities from "@/pages/facilities";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          {isLoading || !isAuthenticated ? (
            <Route path="/" component={Landing} />
          ) : (
            <Route path="/" component={Home} />
          )}
          
          {/* Protected routes */}
          {!isLoading && isAuthenticated && (
            <>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile" component={Profile} />
            </>
          )}
          
          {/* Public routes */}
          <Route path="/classes" component={Classes} />
          <Route path="/trainers" component={Trainers} />
          <Route path="/membership" component={Membership} />
          <Route path="/facilities" component={Facilities} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="body-mechanics-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
