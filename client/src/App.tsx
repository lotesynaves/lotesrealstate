import React from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { queryClient } from "./lib/queryClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/not-found";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import Login from './pages/admin/Login';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoutes from './pages/admin';
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <AuthProvider>
        <Route path="/lotesynavesadmin/login" component={Login} />
        <Route path="/lotesynavesadmin/dashboard" component={AdminRoutes} />
      </AuthProvider>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">

            {!location.startsWith('/lotesynavesadmin/dashboard') && <Header />}
            <main className="flex-1 relative">
              <Router />
              {!location.startsWith('/lotesynavesadmin/dashboard') && <FloatingWhatsAppButton />}
            </main>
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;