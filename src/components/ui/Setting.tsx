import { ToggleOffOutlined, ToggleOnOutlined } from "@mui/icons-material";
import { FunctionComponent } from "react";

interface SettingProps {
  value: boolean;
  onChange: () => void;
  label: string;
}

const Setting: FunctionComponent<SettingProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between p-2 border-b-4 border-neutral-gray">
      <p className="text-xl font-bold">{label}</p>

      <button aria-label={`${label}`} onClick={onChange}>
        {value ? (
          <ToggleOnOutlined
            style={{ width: 40, height: 40 }}
            className="text-primary"
          />
        ) : (
          <ToggleOffOutlined style={{ width: 40, height: 40 }} />
        )}
      </button>
    </div>
  );
};

export default Setting;
