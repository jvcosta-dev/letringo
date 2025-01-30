import { useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Section from "../components/layout/Section";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Setting from "../components/ui/Setting";
import { useSettings } from "../contexts/SettingsContext";
import { useUser } from "../contexts/UserContext";

function Settings() {
  const {
    animations,
    darkMode,
    sound,
    toggleAnimations,
    toggleDarkMode,
    toggleSound,
  } = useSettings();
  const { logout } = useUser();
  const navigate = useNavigate();
  return (
    <Page>
      <BackButton />
      <Section name="Geral">
        <div className="flex flex-col gap-5">
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
          <Button
            ariaLabel="finalizar sessão"
            size="xl"
            onClick={() => {
              logout;
              navigate("/login");
            }}
            fill
          >
            Finalizar Sessão
          </Button>
        </div>
      </Section>
    </Page>
  );
}

export default Settings;
