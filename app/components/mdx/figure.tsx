interface Props {
  src: string;
  caption?: string;
}

function Figure({ src, caption }: Props) {
  return (
    <figure className="flex flex-col items-center justify-center gap-2">
      <img
        alt={caption}
        className="select-none object-cover"
        src={src}
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
