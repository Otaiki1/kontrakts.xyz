
import BtnWide from "../ui/BtnWide";
import HomeNav from "../ui/HomeNav";
import BtnSmall from "../ui/BtnSmall";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext.jsx";

function LandingPage() {
 
  const{connectWallet}  = useContext(BlockchainContext)

  return (
    <div className="relative h-[100vh] overflow-y-hidden">
      <HomeNav>
        <BtnSmall onClick={connectWallet}>Connect Wallet</BtnSmall>
      </HomeNav>
      <main className="heroImg h-[929px] pt-[167px] text-center text-white">
        <h1 className="mb-[27px] text-[90px] font-bold leading-[84px]">
          Unlock Privacy
          <br /> Prove Legitimacy{" "}
        </h1>
        <p className="leading-default mb-[30px] text-[22px] font-semibold">
          Where your agreements stay private, and their existence is
          indisputable
        </p>
        <BtnWide >Get Started</BtnWide>
      </main>
    </div>
  );
}

export default LandingPage;
