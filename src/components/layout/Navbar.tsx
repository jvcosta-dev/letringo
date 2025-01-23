import {
  AccountCircleRounded,
  CollectionsBookmarkRounded,
  EmojiEventsRounded,
  HomeRounded,
} from "@mui/icons-material";
import { ElementType, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <nav className="w-full py-6 px-6 md:px-32 lg:px-52 xl:px-[512px] border-t-4 border-neutral-gray dark:border-neutral-dark">
      <ul className="flex items-center justify-between">
        <NavItem href="/home" ariaLabel="início" Icon={HomeRounded} />
        <NavItem
          href="/library"
          ariaLabel="biblioteca"
          Icon={CollectionsBookmarkRounded}
        />
        <NavItem
          href="/ranking"
          ariaLabel="ranking"
          Icon={EmojiEventsRounded}
        />
        <NavItem
          href="/profile"
          ariaLabel="perfil"
          Icon={AccountCircleRounded}
        />
      </ul>
    </nav>
  );
};

export default Navbar;

interface NavItemProps {
  href: string;
  ariaLabel: string;
  Icon: ElementType;
}

const NavItem: FunctionComponent<NavItemProps> = ({
  href,
  ariaLabel,
  Icon,
}) => {
  return (
    <li className="flex flex-col items-center gap-1 capitalize">
      <NavLink
        to={href}
        aria-label={ariaLabel}
        className={({ isActive }) =>
          `px-4 py-1 rounded-xl text-neutral-gray hover:bg-neutral-100 hover:text-primary  ${
            isActive && "bg-primary text-white"
          }`
        }
      >
        <Icon style={{ width: 40, height: 40 }} />
      </NavLink>
      {ariaLabel}
    </li>
  );
};
