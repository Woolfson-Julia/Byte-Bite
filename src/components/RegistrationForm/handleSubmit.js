import axios from "axios";

import { register } from "../../redux/auth/operations";

export const handleSubmit = async (values, actions, dispatch) => {
  const { username, email, password } = values;

  const valuesToSend = {
    name: username,
    email,
    password,
  };
  dispatch(register(valuesToSend));

  actions.resetForm();
};
