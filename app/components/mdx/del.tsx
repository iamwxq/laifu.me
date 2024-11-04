interface Props {
  children: React.ReactNode;
}

function Del({ children }: Props) {
  return (
    <del>
      {children}
    </del>
  );
};

export default Del;
