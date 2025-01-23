// settingsContext.tsx
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FunctionComponent,
  useEffect,
} from "react";

interface SettingsContextType {
  sound: boolean;
  animations: boolean;
  darkMode: boolean;
  toggleSound: () => void;
  toggleAnimations: () => void;
  toggleDarkMode: () => void;
}

const getSettingFromStorage = (key: string, defaultValue: boolean): boolean => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const SettingsContext = createContext<SettingsContextType>({
  sound: true,
  animations: true,
  darkMode: false,
  toggleSound: () => {},
  toggleAnimations: () => {},
  toggleDarkMode: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({
  children,
}) => {
  const [sound, setSound] = useState(() =>
    getSettingFromStorage("sound", true)
  );
  const [animations, setAnimations] = useState(() =>
    getSettingFromStorage("animations", true)
  );
  const [darkMode, setDarkMode] = useState(() =>
    getSettingFromStorage("darkMode", true)
  );

  const saveToLocalStorage = (key: string, value: boolean) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const toggleSound = () => {
    const newSound = !sound;
    setSound(newSound);
    saveToLocalStorage("sound", newSound);
  };

  const toggleAnimations = () => {
    const newAnimations = !animations;
    setAnimations(newAnimations);
    saveToLocalStorage("animations", newAnimations);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    saveToLocalStorage("darkMode", !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        sound,
        animations,
        darkMode,
        toggleSound,
        toggleAnimations,
        toggleDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
