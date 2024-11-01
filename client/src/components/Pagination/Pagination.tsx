import Button from "../buttons";

type PaginationProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, pages, onChange }: PaginationProps) {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <Button.Icon onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <i className="fa fa-chevron-left" />
      </Button.Icon>

      <span>
        {page} of {pages}
      </span>

      <Button.Icon onClick={() => onChange(page + 1)} disabled={page >= pages}>
        <i className="fa fa-chevron-right" />
      </Button.Icon>
    </div>
  );
}
