import SuperheroForm from "../components/superheroForm/SuperheroForm";
import api from "../lib/fetch/api";
import { SuperheroData } from "../lib/types/Superhero";

export default function NewPage() {
  const createSuperhero = (data: SuperheroData) => {
    api.post("superheroes", data);
  };

  return (
    <main className="flex flex-col gap-10 max-w-[600px]">
      <h1 className="text-5xl text-center">Create a new Superhero</h1>

      <SuperheroForm onSubmit={createSuperhero} />
    </main>
  );
}
