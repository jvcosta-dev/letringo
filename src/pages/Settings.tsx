import Page from "../components/layout/Page";
import Section from "../components/layout/Section";
import BackButton from "../components/ui/BackButton";
import Setting from "../components/ui/Setting";
import { useSettings } from "../contexts/SettingsContext";

function Settings() {
  const {
    animations,
    darkMode,
    sound,
    toggleAnimations,
    toggleDarkMode,
    toggleSound,
  } = useSettings();
  return (
    <Page>
      <BackButton />
      <Section name="Geral">
        <div className="border-4 border-neutral-gray rounded-xl">
          <Setting
            label="Efeitos Sonoros"
            value={sound}
            onChange={toggleSound}
          />
          <Setting
            label="Animações"
            value={animations}
            onChange={toggleAnimations}
          />
          <Setting
            label="Modo Escuro"
            value={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </Section>
    </Page>
  );
}

export default Settings;
