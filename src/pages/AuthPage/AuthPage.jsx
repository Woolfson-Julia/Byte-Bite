import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './AuthPage.module.css'

export default function AuthPage() {

  return (
    <>
      <RegistrationForm />
      <LoginForm />
    </>
  );
}