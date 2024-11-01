import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Superhero } from "../lib/types/Superhero";
import api from "../lib/fetch/api";

import Pagination from "../components/Pagination";
import Button from "../components/buttons";

export default function DetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [superhero, setSuperhero] = useState<Superhero | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    api.get<Superhero>(`superheroes/${id}`).then(setSuperhero);
  }, [id]);

  return (
    <main className="max-w-[600px] w-full">
      {superhero && (
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl text-center">{superhero.nickname}</h1>

          <div className="flex flex-col gap-2">
            <span className="text-xl">
              Catch phrase: <b>{superhero.catch_phrase || "N/A"}</b>
            </span>
            <span className="text-xl">
              Real name: <b>{superhero.real_name || "Unknown"}</b>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl">Origin</span>

            {superhero.origin_description || "Origin unknown."}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl">Superpowers</span>

            <div className="flex flex-row gap-2">
              {superhero.superpowers.length === 0 ? (
                <span>No superpowers!</span>
              ) : (
                superhero.superpowers.map((superpower, index) => (
                  <span
                    key={index}
                    className="bg-cyan-500 rounded w-max px-2 py-1"
                  >
                    {superpower}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">Images</span>

            {superhero.images.length === 0 ? (
              <span>No images!</span>
            ) : (
              <>
                <img
                  src={superhero.images[imageIndex]}
                  alt={`Image of ${superhero.nickname}`}
                />

                <Pagination
                  page={imageIndex + 1}
                  pages={superhero.images.length}
                  onChange={(page) => setImageIndex(page - 1)}
                />
              </>
            )}
          </div>

          <div className="flex flex-row gap-2">
            <Button.Text
              preset="good"
              className="text-lg px-4"
              onClick={() => navigate(`/edit/${superhero.id}`)}
            >
              Edit
            </Button.Text>

            <Button.Text
              preset="bad"
              className="text-lg px-4"
              onClick={() => {
                api.delete(`superheroes/${superhero.id}`);
                navigate(`/`);
              }}
            >
              Delete
            </Button.Text>
          </div>
        </div>
      )}
    </main>
  );
}
