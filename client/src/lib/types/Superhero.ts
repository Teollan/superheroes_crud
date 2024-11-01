export type SuperheroData = {
  nickname: string;
  catch_phrase: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  images: string[];
};

export type Superhero = SuperheroData & {
  id: number;
};
