import React from "react";
import "./App.css"
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import Layout from "./Layout";

function App() {
  return (
      <AuthProvider>
        <SidebarProvider>
          <div className="App">
            <Layout />
          </div>
        </SidebarProvider>
      </AuthProvider>
  );
}

export default App;
