interface Props {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: Props) => {
  return (
    <h1 className="relative text-3xl font-medium dark:text-white py-4 pb-6">
      {children}
      <span className="absolute bottom-4 left-0 bg-red-700 h-1 w-20"></span>
      <span className="absolute bottom-2 left-0 bg-red-700 h-1 w-10"></span>
    </h1>
  );
};

export default SectionTitle;
