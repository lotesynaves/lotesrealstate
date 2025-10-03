import { useState } from 'react';
import Header from '../Header';
import { Router } from 'wouter';

export default function HeaderExample() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <Router>
      <Header
        theme={theme}
        onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </Router>
  );
}
