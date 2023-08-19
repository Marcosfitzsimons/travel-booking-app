interface MyComponentProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: MyComponentProps) => {
  return <h3 className="my-2 text-xl font-medium">{children}</h3>;
};

export default SectionTitle;
