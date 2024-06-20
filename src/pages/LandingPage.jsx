
import BtnWide from "../ui/BtnWide";

import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext.jsx";
import AuthNav from "../ui/AuthNav.jsx";
import { NavLink } from "react-router-dom";

function LandingPage() {
 
  const{address}  = useContext(BlockchainContext)

  return (
    <div className="relative h-[100vh] overflow-y-hidden">
      <AuthNav />
      <main className="heroImg h-[929px] pt-[167px] text-center text-white">
        <h1 className="mb-[27px] text-[90px] font-bold leading-[84px]">
          Unlock Privacy
          <br /> Prove Legitimacy{" "}
        </h1>
        <p className="leading-default mb-[30px] text-[22px] font-semibold">
          Where your agreements stay private, and their existence is
          indisputable
        </p>
        {address && <NavLink to="/create"><BtnWide >Get Started</BtnWide>
          </NavLink>}
        {!address && <BtnWide >Connect Wallet to Get Started</BtnWide>}
      </main>
    </div>
  );
}

export default LandingPage;
