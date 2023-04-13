interface MyComponentProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: MyComponentProps) => {
  return (
    <h3 className="relative text-3xl font-medium  py-6 mb-6 dark:text-white lg:text-4xl">
      {children}
      <span className="absolute bottom-4 left-0 bg-red-700 h-1 w-20"></span>
      <span className="absolute bottom-2 left-0 bg-red-700 h-1 w-10"></span>
    </h3>
  );
};

export default SectionTitle;
