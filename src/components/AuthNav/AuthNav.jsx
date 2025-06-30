import { Link } from "react-router-dom";

export default function AuthNav() {
  return (
    <>
      <Link to="/auth/login">Log in</Link>
      <Link to="/auth/register">Register</Link>
    </>
  );
}
