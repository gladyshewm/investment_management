import React from "react";
import "./App.css"
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
      <AuthProvider>
        <SidebarProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </SidebarProvider>
      </AuthProvider>
  );
}

export default App;
