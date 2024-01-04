import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import themeButtonVariants from "@/lib/variants/themeButtonVariants";

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
    <div className="relative left-2">
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            variants={themeButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="sun"
          >
            <Button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              variant="ghost"
              className="w-8 h-8 rounded-md p-0 dark:hover:text-white"
            >
              <SunMedium className="w-5 h-5" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={themeButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="moon"
          >
            <Button
              aria-label="Toggle theme"
              variant="ghost"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md p-0 dark:text-white"
            >
              <MoonStar className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div />
  );
}
