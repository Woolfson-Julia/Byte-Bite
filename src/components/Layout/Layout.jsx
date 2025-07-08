import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import BaseModal from "../BaseModal/BaseModal";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={css.layout}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
      <BaseModal />
    </div>
  );
}
