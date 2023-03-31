import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="font-serif tracking-wider dark:hover:text-white">
      <span className="font-medium text-xl">F</span>
      <span className="inline-block rotate-3">a</span>
      <span className="inline-block -rotate-6">b</span>
      <span className="inline-block rotate-1">e</span>
      <span className="font-medium text-xl">B</span>
      <span className="inline-block rotate-6">u</span>
      <span className="inline-block -rotate-3">s</span>
    </Link>
  );
};

export default Logo;
