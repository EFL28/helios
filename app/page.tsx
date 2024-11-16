"use client";

import SportsList from "@/ui/sports-list";
import Welcome from "@/ui/welcome";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      <Welcome />
      <SportsList />
    </div>
  );
}
