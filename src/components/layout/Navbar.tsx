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
    <nav className="flex items-center justify-between py-6 px-6 md:px-32 lg:px-52 xl:px-[512px] border-t-4 border-primary">
      <NavItem href="/home" ariaLabel="início" Icon={HomeRounded} />
      <NavItem
        href="/library"
        ariaLabel="biblioteca"
        Icon={CollectionsBookmarkRounded}
      />
      <NavItem href="/ranking" ariaLabel="ranking" Icon={EmojiEventsRounded} />
      <NavItem
        href="/profile"
        ariaLabel="sua conta"
        Icon={AccountCircleRounded}
      />
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
    <NavLink
      to={href}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        `p-2 rounded-xl text-neutral-gray hover:bg-neutral-100 hover:text-primary  ${
          isActive && "bg-primary text-white"
        }`
      }
    >
      <Icon style={{ width: 40, height: 40 }} />
    </NavLink>
  );
};
