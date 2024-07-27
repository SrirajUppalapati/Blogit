import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  // Ensure theme has a valid value or fallback to a default
  const themeClass = theme === "dark" ? "dark" : "light";

  return (
    <div className={themeClass}>
      <div
        className={`bg-white text-gray-900 ${
          themeClass === "dark" ? "dark:bg-slate-900 dark:text-white" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
