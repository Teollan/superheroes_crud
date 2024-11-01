import { ReactNode } from "react";

import DataToken from "./DataToken";
import { Token } from "../../lib/types/Token";

type TokenListProps<T> = {
  tokens: Token<T>[];
  render: (token: Token<T>) => ReactNode;
  onRemove: (id: Token<T>["id"]) => void;
};

export default function TokenList<T>({
  tokens,
  render,
  onRemove,
}: TokenListProps<T>) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tokens.map((token) => (
        <DataToken onRemove={() => onRemove(token.id)} key={token.id}>
          {render(token)}
        </DataToken>
      ))}
    </div>
  );
}
