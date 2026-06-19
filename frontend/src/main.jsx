import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/Auth.context.jsx";
import ThemeProvider from "./contexts/Theme.context.jsx";
import ChatProvider from "./contexts/Chat.context.jsx";

createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </ChatProvider>,
);
