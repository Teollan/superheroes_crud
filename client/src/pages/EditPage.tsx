import { useEffect, useState } from "react";
import SuperheroForm from "../components/superheroForm/SuperheroForm";
import { useNavigate, useParams } from "react-router-dom";
import { Superhero, SuperheroData } from "../lib/types/Superhero";
import api from "../lib/fetch/api";

export default function EditPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [superhero, setSuperhero] = useState<Superhero | null>(null);

  useEffect(() => {
    api.get<Superhero>(`superheroes/${id}`).then(setSuperhero);
  }, [id]);

  const updateSuperhero = (data: SuperheroData) => {
    api
      .put<Superhero, SuperheroData>(`superheroes/${id}`, data)
      .then((updated) => {
        setSuperhero(updated);
        navigate(`/details/${updated.id}`);
      });
  };

  return (
    <main className="flex flex-col gap-10 max-w-[600px] w-full">
      <h1 className="text-5xl text-center">Edit</h1>

      {superhero && (
        <SuperheroForm
          nickname={superhero.nickname ?? ""}
          catchPhrase={superhero.catch_phrase ?? ""}
          realName={superhero.real_name ?? ""}
          originDescription={superhero.origin_description ?? ""}
          superpowers={superhero.superpowers ?? []}
          images={superhero.images ?? []}
          onSubmit={updateSuperhero}
        />
      )}
    </main>
  );
}
