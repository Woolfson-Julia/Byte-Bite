import Switch from "@mui/material/Switch";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";


export default function UserMenu() {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  
  const handleLogout = () => {
    dispatch(logOut())
  }

  const label = { inputProps: { "aria-label": "Switch demo" } };
  
  return (
    <div className={css.container}>
      <p className={css.text}>
        Welcome, <span className={css.span}>{user.name}</span>
      </p>
      <button type="button" onClick={handleLogout} className={css.button}>
        <Switch
          {...label}
          defaultChecked
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#f6bb62",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#f6bb62",
            },
          }}
        />
        Logout
      </button>
    </div>
  );
}