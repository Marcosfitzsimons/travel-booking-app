interface Props {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: Props) => {
  return (
    <h1 className="relative flex items-center justify-center text-2xl gap-1 dark:text-white font-medium lg:justify-start lg:text-3xl">
      {children}
    </h1>
  );
};

export default SectionTitle;
