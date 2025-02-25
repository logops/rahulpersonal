import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Work from "@/pages/work";
import Writing from "@/pages/writing";
import Projects from "@/pages/projects";
import Photos from "@/pages/photos";
import MobileNav from "@/components/mobile-nav";
import { useMedia } from "@/hooks/use-mobile";

function Router() {
  const isMobile = useMedia("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work" component={Work} />
          <Route path="/writing" component={Writing} />
          <Route path="/projects" component={Projects} />
          <Route path="/photos" component={Photos} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {isMobile && <MobileNav />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
