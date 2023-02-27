import React, { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";

const themes = ["light", "dark"];

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });
  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div className="">
      {
        <Button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="bg-[#6B46C1] px-[13px] py-[22px] dark:bg-[#ffc98e] hover:bg-[#6240b1] hover:dark:bg-[#F6AD55] hover:dark:text-black"
        >
          {theme === "dark" ? (
            <SunMedium className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" fill="white" />
          )}
        </Button>
      }
    </div>
  ) : (
    <div />
  );
}
/*

<Toggle aria-label="Toggle theme" variant="default">
<SunMedium className="w-4 h-4" />
</Toggle>
*/

/*
{themes.map((t) => {
        const checked = t === theme;
        return (
          <button
            key={t}
            className={`${
              checked ? "bg-white text-black" : ""
            } cursor-pointer rounded-3xl p-2`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {t === "light" ? <IoSunny /> : <IoMoon />}
          </button>
        );
      })}
*/
