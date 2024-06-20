import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/">
    <h3 className="text-[23px] font-extrabold leading-[25px] text-primaryColor">
      Contracts.xyz
    </h3>
    </NavLink>
  );
}
