import { logIn } from "../../redux/auth/operations";


export const handleSubmit = async (values, actions, dispatch) => {
  const response = await dispatch(logIn(values));

  actions.resetForm();
};
