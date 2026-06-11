import React, { useState } from "react";
import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const themeOptions = [
  { value: "system", label: "System", Icon: Laptop },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ActiveIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div className="relative theme-menu">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50"
        aria-label="Change theme"
      >
        <ActiveIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-gray-100 animate-fade-in-up">
            {themeOptions.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  theme === value
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{label}</span>
                {theme === value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
