import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import abi from "../utils/Agreement.abi.json";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
 const CONTRACT_ADDRESS = "0x271C7936f116F71B9B670322C5574171C44A284E";
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await switchToBaseSepolia();
        console.log(account[0]);
        setAddress(account[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

 const switchToBaseSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "84532" }], // base Sepolia chain id is 84532
      });
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };




  const createAgreement = async (party2Address, tokenURI) => {
    try {
      // Connect to a custom JSON-RPC endpoint
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.createAgreement(party2Address, tokenURI);
      await tx.wait();
      return true
    } catch (err) {
      console.log("error is ---",err);
      return false;
    }
  };

  const signAgreement = async (agreementId) => {
    try {
      // Connect to a custom JSON-RPC endpoint
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.party2SignAgreement(agreementId);
      await tx.wait();
      return true;
    } catch (err) {
      console.log("error is ---",err);
      return false;
    }
  };

  const mintAgreement = async (agreementId) => {
    try {
      // Connect to a custom JSON-RPC endpoint
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.mintNFTAgreement(agreementId);
      await tx.wait();
      return true;
    } catch (err) {
      console.log("error is ---",err);
      return false;
    }
  };

  const deleteAgreement = async (agreementId) => {
    try {
      // Connect to a custom JSON-RPC endpoint
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.deleteContract(agreementId);
      await tx.wait();
      return true;
    } catch (err) {
      console.log("error is ---",err);
      return false;
    }
  };

  const getOwnerCases = async (address) => {
    // Connect to a custom JSON-RPC endpoint
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.getUsersCases(address);

      alert("Fetched Values");
      return tx;
    } catch (err) {
      alert("process failed");
      console.log("error is ---",err);
      return null;
    }
  };

  const getAgreementDetails = async (agreementId) => {
    // Connect to a custom JSON-RPC endpoint
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.getAgreementDetails(agreementId);
      console.log("vallues is ", tx);
      return tx;
    } catch (err) {
      console.log("error is ---",err);
      return null;
    }
  };

  const getParty1Agreements = async (agreementId) => {
    // Connect to a custom JSON-RPC endpoint
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.getParty1Agreements(agreementId);
      console.log("vallues is ", tx);
      return tx;
    } catch (err) {
      console.log("error is ---",err);
      return null;
    }
  };

  const getParty2Agreements = async (agreementId) => {
    // Connect to a custom JSON-RPC endpoint
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.getParty2Agreements(agreementId);
      console.log("vallues is ", tx);
      return tx;
    } catch (err) {
      console.log("error is ---",err);
      return null;
    }
  };



  const contextValue = {
    address,
    connectWallet,
    createAgreement,
    signAgreement,
    mintAgreement,
    deleteAgreement,
    getOwnerCases,
    getAgreementDetails,
    getParty1Agreements,
    getParty2Agreements,
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};
// Define prop-types for the component
BlockchainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

