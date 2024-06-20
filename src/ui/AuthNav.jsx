/* eslint-disable react/prop-types */
import AddressContainer from "./AddressContainer";
import Logo from "./Logo";
import placeholder from "../assets/placeholder.png";
import BtnSmall from "./BtnSmall";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

function AuthNav() {
  const {address, connectWallet} = useContext(BlockchainContext)
  return (
    <nav
      className="col-span-full flex w-full items-center justify-between bg-white py-7 pl-[34px] pr-[27px] shadow-secondaryShadow"
      // style={layout ? layout : {}}
    >
      <Logo />
      <div className="flex items-center">
        {address && 
        <><AddressContainer address={address}/>
        <img src={placeholder} className="ml-6" alt="" />
        </>
        }
        {!address &&  <BtnSmall onClick={connectWallet}>Connect Wallet</BtnSmall>}
      </div>
    </nav>
  );
}

export default AuthNav;
