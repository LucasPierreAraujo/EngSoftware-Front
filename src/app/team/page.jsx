"use client";

import TeamTable from "../components/TeamTable"; // Caminho correto

export default function TeamPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Equipe</h1>
      <TeamTable />
    </div>
  );
}
