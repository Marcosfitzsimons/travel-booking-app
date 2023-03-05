import React, { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

const themeIconVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      ease: "easeOut",
    },
  },
};

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
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            variants={themeIconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="sun"
          >
            <Button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="px-[13px] py-[22px] dark:bg-[#F6AD55] dark:text-white dark:hover:bg-[#F6AD55]"
            >
              <SunMedium className="w-5 h-5" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={themeIconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="moon"
          >
            <Button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="bg-[#6B46C1] px-[13px] py-[22px] hover:bg-[#6240b1]"
            >
              <Moon className="w-5 h-5" fill="white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div />
  );
}
