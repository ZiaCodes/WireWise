import { useContext } from "react";
import { ThemeContext } from "../hooks/useTheme";

export const useTheme = () => useContext(ThemeContext);