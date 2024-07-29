import Link from "next/link";

import { NAVBAR_OPTION_LIST } from "@/app/(my-page)/_constant";

const NavBar = () => {
  return (
    <ul>
      {NAVBAR_OPTION_LIST.map(option => (
        <li key={option.label}>
          <Link href={option.href}>{option.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
