import { Link } from "react-router-dom";
import { Superhero } from "../../lib/types";
import Button from "../buttons";

type SuperheroCardProps = {
  superhero: Superhero;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SuperheroCard({
  superhero,
  onEdit,
  onDelete,
}: SuperheroCardProps) {
  const edit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    onEdit();
  };

  const del = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    onDelete();
  };

  return (
    <Link to={`/details/${superhero.id}`}>
      <article className="flex flex-col gap-2 rounded bg-slate-200 p-4">
        <div>
          <img
            className="w-full aspect-square object-cover object-top"
            src={superhero.images[0]}
            alt={`Image of ${superhero.nickname}`}
          />
        </div>

        <div className="flex flex-row gap-2 justify-between items-center">
          <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
            {superhero.nickname}
          </span>

          <div className="flex flex-row gap-2">
            <Button.Icon onClick={edit}>
              <i className="fa fa-edit" />
            </Button.Icon>

            <Button.Icon onClick={del}>
              <i className="fa fa-trash" />
            </Button.Icon>
          </div>
        </div>
      </article>
    </Link>
  );
}
