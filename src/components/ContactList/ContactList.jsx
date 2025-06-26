import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";


export default function ContactList() {

  const contacts = useSelector(selectFilteredContacts);

  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <ul className={css.list}>
      {sortedContacts.map((contact) => (
        <li className={css.item} key={contact.id}>
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  );
}