
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthScreen } from "@/components/auth-screen";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mg_user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthScreen onSuccess={setUser} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;