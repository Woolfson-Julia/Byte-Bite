import { logIn } from "../../redux/auth/operations";

export const handleSubmit = (values, actions, dispatch) => {
  dispatch(logIn(values));
  actions.resetForm();
};
