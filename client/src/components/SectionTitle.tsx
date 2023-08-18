interface MyComponentProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: MyComponentProps) => {
  return <h3 className="text-center my-2 text-lg font-medium">{children}</h3>;
};

export default SectionTitle;
