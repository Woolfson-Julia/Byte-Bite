import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import Navigation from "../Navigation/Navigation.jsx";

export default function NavPanel({ onLinkClick }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Navigation onLinkClick={onLinkClick} />
      {isLoggedIn ? (
        <UserMenu onLinkClick={onLinkClick} />
      ) : (
        <AuthNav onLinkClick={onLinkClick} />
      )}
    </>
  );
}
