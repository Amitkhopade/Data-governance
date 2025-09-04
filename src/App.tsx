import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DataCatalog from "./pages/DataCatalog";
import DataQuality from "./pages/DataQuality";
import PolicyStudio from "./pages/PolicyStudio";
import SourceCompleteness from "./pages/SourceCompleteness";
import SqlConnector from "./pages/SqlConnector";
import Agent from "./pages/Agent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalog" element={<DataCatalog />} />
            <Route path="/lineage" element={<div className="p-6">Lineage Explorer - Coming Soon</div>} />
            <Route path="/policies" element={<PolicyStudio />} />
            <Route path="/quality" element={<DataQuality />} />
            <Route path="/access" element={<div className="p-6">Access Center - Coming Soon</div>} />
            <Route path="/regulatory" element={<div className="p-6">Regulatory Workspace - Coming Soon</div>} />
            <Route path="/audit" element={<div className="p-6">Audit Evidence Lake - Coming Soon</div>} />
            <Route path="/sources" element={<SourceCompleteness />} />
            <Route path="/sql-connector" element={<SqlConnector />} />
            <Route path="/agent" element={<Agent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
