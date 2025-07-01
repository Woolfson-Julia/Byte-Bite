import axios from "axios";

import { register } from "../../redux/auth/operations";

export const handleSubmit = async (values, actions, dispatch) => {
  const { name, email, password } = values;

  const valuesToSend = {
    name,
    email,
    password,
  };
  dispatch(register(valuesToSend));

  actions.resetForm();
};
