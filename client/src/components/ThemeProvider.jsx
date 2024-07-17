import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
