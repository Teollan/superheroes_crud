import { useEffect, useState } from "react";
import { Superhero } from "../lib/types/Superhero";
import api from "../lib/fetch/api";

import SuperheroCard from "../components/SuperheroCard";
import Pagination from "../components/Pagination";
import Button from "../components/buttons";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [superheroes, setSuperheroes] = useState<Superhero[]>(null!);
  const [page, setPage] = useState(1);

  const pages = Math.ceil((superheroes?.length ?? 1) / 5);

  useEffect(() => {
    api.get<Superhero[]>("superheroes/").then(setSuperheroes);
  }, []);

  return (
    <main className="flex flex-col gap-10 max-w-[1200px] w-full items-center">
      <h1 className="text-5xl text-center">Superheroes</h1>

      <div className="grid gap-2 grid-cols-5">
        {superheroes &&
          superheroes.map((hero) => (
            <SuperheroCard
              key={hero.id}
              superhero={hero}
              onEdit={() => navigate(`/edit/${hero.id}`)}
              onDelete={() => api.delete(`superheroes/${hero.id}`)}
            />
          ))}
      </div>

      <Pagination page={page} pages={pages} onChange={() => {}} />

      <Button.Text
        preset="good"
        className="text-2xl px-8"
        onClick={() => navigate("/new")}
      >
        New Superhero
      </Button.Text>
    </main>
  );
}
