interface MyComponentProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: MyComponentProps) => {
  return <h3 className="my-3 text-xl font-medium lg:my-8">{children}</h3>;
};

export default SectionTitle;
