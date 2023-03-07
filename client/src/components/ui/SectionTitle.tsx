import React from "react";
// import { RoughNotation } from "react-rough-notation";

interface MyComponentProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: MyComponentProps) => {
  return (
    <h3 className="relative text-3xl font-medium dark:text-white py-4 pb-6">
      {children}
      <span className="absolute bottom-4 left-0 bg-red h-1 w-20"></span>
      <span className="absolute bottom-2 left-0 bg-red h-1 w-10"></span>
    </h3>
  );
};

export default SectionTitle;

// <RoughNotation type="underline" show={true} color="#bd284d" padding={5}>
// </RoughNotation>
