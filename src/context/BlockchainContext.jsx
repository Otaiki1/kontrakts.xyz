import { createContext, useState } from "react";
import PropTypes from "prop-types";
// import { ethers } from "ethers";
// import abi from "../utils/Custody.abi.json";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
//   const CONTRACT_ADDRESS = "0x4402102dD08C42C09AB3A8e9F57DFace138602e9";
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



  const contextValue = {
    address,
    connectWallet,
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


//   // A function that takes a solidity output as a string and returns a readable time as a string
//   function convertToReadableTime(solidityOutput) {
//     // Convert the BigNumber object to a number
//     const seconds = Number(solidityOutput);

//     // Create a Date object from the number
//     const date = new Date(seconds * 1000); // multiply by 1000 to get milliseconds

//     // Format the Date object as a readable string
//     const readableTime = date.toLocaleString(); // use your preferred options

//     // Return the readable time
//     return readableTime;
//   }

//   const createCase = async (hash, address) => {
//     try {
//       // Connect to a custom JSON-RPC endpoint
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//       const tx = await contract.createCase(hash, address);
//       await tx.wait();
//       alert("Process Successful");
//     } catch (err) {
//       alert("process failed");
//       alert(err);
//     }
//   };

//   const addWitness = async (caseId, witnessAddress) => {
//     try {
//       // Connect to a custom JSON-RPC endpoint
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//       const tx = await contract.addWitness(caseId, witnessAddress);
//       await tx.wait();
//       alert("Process Successful");
//     } catch (err) {
//       alert("process failed");
//       alert(err);
//     }
//   };

//   const uploadEvidence = async (caseId, evidenceData) => {
//     try {
//       // Connect to a custom JSON-RPC endpoint
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//       const tx = await contract.uploadEvidence(caseId, evidenceData);
//       await tx.wait();
//       alert("Process Successful");
//     } catch (err) {
//       alert("process failed");
//       alert(err);
//     }
//   };

//   const getOwnerCases = async (address) => {
//     // Connect to a custom JSON-RPC endpoint
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     try {
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//       const tx = await contract.getUsersCases(address);

//       alert("Fetched Values");
//       return tx;
//     } catch (err) {
//       alert("process failed");
//       alert(err);
//       return null;
//     }
//   };

//   const getCaseDetail = async (fileId) => {
//     // Connect to a custom JSON-RPC endpoint
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

//     try {
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//       const tx = await contract.getCaseDetails(fileId);

//       alert("Fetched Values");
//       console.log("vallues is ", tx);
//       return tx;
//     } catch (err) {
//       alert("process failed");
//       alert(err);
//       return null;
//     }
//   };