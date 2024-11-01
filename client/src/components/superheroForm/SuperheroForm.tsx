import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../inputs";
import TokenList from "../tokenList/TokenList";
import { Token } from "../../lib/types";
import Button from "../buttons";
import { SuperheroData } from "../../lib/types/Superhero";

type TextData = {
  nickname: string;
  catchPhrase: string;
  realName: string;
  originDescription: string;
};

type SuperheroFormProps = {
  nickname?: string;
  catchPhrase?: string;
  realName?: string;
  originDescription?: string;
  superpowers?: string[];
  images?: string[];

  onSubmit?: (data: SuperheroData) => void;
};

export default function SuperheroForm({
  nickname = "",
  catchPhrase = "",
  realName = "",
  originDescription = "",
  superpowers: superpowerNames = [],
  images: imageUrls = [],

  onSubmit = () => {},
}: SuperheroFormProps) {
  const [textData, setTextData] = useState<TextData>({
    nickname,
    catchPhrase,
    realName,
    originDescription,
  });

  const updateNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setTextData((td) => ({ ...td, nickname: event.target.value }));
  };

  const updateCatchPhrase = (event: ChangeEvent<HTMLInputElement>) => {
    setTextData((td) => ({ ...td, catchPhrase: event.target.value }));
  };

  const updateRealName = (event: ChangeEvent<HTMLInputElement>) => {
    setTextData((td) => ({ ...td, realName: event.target.value }));
  };

  const updateOriginDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextData((td) => ({ ...td, originDescription: event.target.value }));
  };

  const [superpowers, setSuperpowers] = useState<Token<string>[]>(
    superpowerNames.map((power) => ({
      data: power,
      id: `${power}_${Date.now()}`,
    }))
  );

  const [images, setImages] = useState<Token<string>[]>(
    imageUrls.map((url) => ({ data: url, id: url }))
  );

  const addSuperpower = (text: string) => {
    const newToken = { data: text, id: `${text}_${Date.now()}` };

    setSuperpowers((prev) => [...prev, newToken]);
  };

  const removeSuperpower = (id: Token<string>["id"]) => {
    setSuperpowers((prev) => prev.filter((token) => token.id !== id));
  };

  const addImage = (image: File) => {
    const url = URL.createObjectURL(image);

    const newImage: Token<string> = {
      data: url,
      id: url,
    };

    setImages((prev) => [...prev, newImage]);
  };

  const removeImage = (id: Token<string>["id"]) => {
    setImages((prev) => prev.filter((token) => token.id !== id));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      nickname: textData.nickname,
      catch_phrase: textData.catchPhrase,
      real_name: textData.realName,
      origin_description: textData.originDescription,
      superpowers: superpowers.map((token) => token.data),
      images: images.map((token) => token.data),
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={submit}>
      <Input.Text
        name="nickname"
        label="Nickname"
        value={textData.nickname}
        onChange={updateNickname}
        required
      />

      <Input.Text
        name="catch_phrase"
        label="Catch phrase"
        value={textData.catchPhrase}
        onChange={updateCatchPhrase}
      />

      <Input.Text
        name="real_name"
        label="Real name"
        value={textData.realName}
        onChange={updateRealName}
      />

      <Input.TextArea
        name="origin_description"
        label="Origin and Description"
        rows={7}
        value={textData.originDescription}
        onChange={updateOriginDescription}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="superpowers">Superpowers</label>

        {superpowers.length ? (
          <TokenList
            tokens={superpowers}
            render={({ data: text }) => <span>{text}</span>}
            onRemove={removeSuperpower}
          />
        ) : (
          <span>No data on superpowers!</span>
        )}

        <Input.Confiramation
          confirm={<span>Add</span>}
          onConfirm={addSuperpower}
          name="superpowers"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="images">Images</label>

        {images.length ? (
          <TokenList
            tokens={images}
            render={({ data: image }) => (
              <div className="max-w-[100px] max-h-[100px]">
                <img
                  src={image}
                  alt={image}
                  className="object-cover object-center"
                />
              </div>
            )}
            onRemove={removeImage}
          />
        ) : (
          <span>No images available!</span>
        )}

        <Input.Image name="images" onFileSelect={addImage} />
      </div>

      <Button.Text type="submit" className="text-xl" preset="good">
        Submit
      </Button.Text>
    </form>
  );
}
