"use client";

import SportsList from "./ui/sports-list";
import Welcome from "./ui/welcome";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Welcome />
      <SportsList />
    </div>
  );

  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle("dark", !isDarkMode);
  // };

  // return (
  //   <div className="bg-background text-foreground">
  //     <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
  //     <div className="p-4 text-primary">Texto en color primario</div>
  //     <div className="p-4 text-secondary">Texto en color secundario</div>
  //     <div className="p-4 text-focus">Texto en color de enfoque</div>
  //   </div>
  // );
}
