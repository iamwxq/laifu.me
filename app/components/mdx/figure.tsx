import clsx from "clsx";

interface Props {
  src: string;
  width?: number;
  height?: number;
  caption?: string;
}

function Figure({ height, width, src, caption }: Props) {
  return (
    <figure className="flex flex-col items-center justify-center gap-2">
      <img
        alt={caption}
        className="select-none object-cover"
        src={src}
        style={{ width, height }}
      />

      {caption && (
        <figcaption className="text-sm italic text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;
