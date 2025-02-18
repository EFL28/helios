'use client';

import QuinielaWidget from '@/components/quiniela/QuinielaWidget';
import { Partido, QuinielaResponse } from '@/utils/types/quiniela.types';
import React from 'react';

export default function QuinielaPage() {
  //   const [quinielaData, setQuinielaData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  //   const [message, setMessage] = React.useState('');

  const [jornada, setJornada] = React.useState<string>('');
  const [partidos, setPartidos] = React.useState<Partido[]>([]);

  React.useEffect(() => {
    const fetchQunielaData = async () => {
      setLoading(true);
      const response = await fetch('/api/quiniela');

      if (!response.ok) {
        setLoading(false);
        const { error } = await response.json();
        setError(error);
      }

      const data: {
        quinielaData: QuinielaResponse;
      } = await response.json();

      const {
        quinielaData: { data: quinielaData },
      } = data;

      const { partidos, jornada } = quinielaData;
      setJornada(jornada);
      setPartidos(partidos);

      setLoading(false);
    };

    fetchQunielaData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center mb-2">Quiniela</h1>
      <h2 className="text-xl text-center mb-8">Jornada {jornada}</h2>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partidos.map((partido, index) => (
          <QuinielaWidget key={index} partido={partido} />
        ))}
      </div>
    </div>
  );
}
