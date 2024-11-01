import { useNavigate } from "react-router-dom";
import SuperheroForm from "../components/superheroForm/SuperheroForm";
import api from "../lib/fetch/api";
import { Superhero, SuperheroData } from "../lib/types";

export default function NewPage() {
  const navigate = useNavigate();

  const createSuperhero = (data: SuperheroData) => {
    api
      .post<Superhero, SuperheroData>("superheroes", data)
      .then((created) => navigate(`/details/${created.id}`));
  };

  return (
    <main className="flex flex-col items-stretch gap-10 max-w-[600px]">
      <h1 className="text-5xl text-center">Create a new Superhero</h1>

      <SuperheroForm onSubmit={createSuperhero} />
    </main>
  );
}
