// import {  useState } from "react";
// import { NavLink } from "react-router-dom";
// import TransgateConnect from "@zkpass/transgate-js-sdk"
// import Swal from "sweetalert2";
// import Web3 from "web3";
// import { Spinner } from "../ui";
// import { ethers } from "ethers";
// // import { BlockchainContext } from "../context/BlockchainContext";
// import AttestationABI from "./AttestationABI.json"

// function CreateIdentityForm() {
//   // const{address} = useContext(BlockchainContext)

//   // const[address, setAddress] =  useState("");
//   // const[name, setName] =  useState("");
//   const[result, setResult] = useState(null)
//   const [verified, setVerified] = useState(false)
//   const[verifying, setVerifying] = useState(false);

//   let schemaId  = "c7eab8b7d7e44b05b41b613fe548edf5"
//   const appId = "39a00e9e-7e6d-461e-9b9d-d520b355d1c0"


// const verifyEVMMessageSignature = (
//   taskId,
//   schema,
//   uHash,
//   publicFieldsHash,
//   signature,
//   originAddress,
//   recipient
// ) => {
//   const web3 = new Web3()

//   const types = ["bytes32", "bytes32", "bytes32", "bytes32"]
//   const values = [Web3.utils.stringToHex(taskId), Web3.utils.stringToHex(schema), uHash, publicFieldsHash]

//   if (recipient) {
//     types.push("address")
//     values.push(recipient)
//   }

//   const encodeParams = web3.eth.abi.encodeParameters(types, values)

//   const paramsHash = Web3.utils.soliditySha3(encodeParams) 

//   const nodeAddress = web3.eth.accounts.recover(paramsHash, signature)
//   return nodeAddress === originAddress
// }

//  const start = async () => {
//     setVerifying(true);
//     try {
//       const connector = new TransgateConnect(appId)
//       const isAvailable = await connector.isTransgateAvailable()    
//       if (!isAvailable) {
//         return Swal.fire("Please install zkPass TransGate")
//       }
//       //@ts-ignore
//       if (window.ethereum == null) {
//         alert("here")
//         return Swal.fire("MetaMask not installed")

//       }
//       //@ts-ignore
//       const provider = new ethers.BrowserProvider(window.ethereum)
//       const signer = await provider.getSigner()
//       //get your ethereum address
//       const account = await signer.getAddress()     
//       const res= await connector.launch(schemaId, account)  
   
//       alert("beginnn")    
//       setResult(res)
      
//       setVerified(verifyEVMMessageSignature(result[0].taskId,
//   res[0].schema,
//   res[0].uHash,
//   res[0].publicFieldsHash,
//   res[0].signature,
//   res[0].originAddress,
//   res[0].recipient))
//   setVerifying(false)
//      // Sepolia contract address
//      // You can add from https://chainlist.org/?search=11155111&testnets=true
//       const contractAddress = "0x8c18c0436A8d6ea44C87Bf5853F8D11B55CF0302"      
      
//       const taskId = ethers.hexlify(ethers.toUtf8Bytes(res.taskId)) // to hex
//       schemaId = ethers.hexlify(ethers.toUtf8Bytes(schemaId)) // to hex

//       const chainParams = {
//         taskId,
//         schemaId,
//         uHash: res.uHash,
//         recipient: account,        
//         publicFieldsHash: res.publicFieldsHash,        
//         validator: res.validatorAddress,
//         allocatorSignature: res.allocatorSignature,
//         validatorSignature: res.validatorSignature,        
//       }      
//       console.log("chainParams", chainParams)

//       const contract = new ethers.Contract(contractAddress, AttestationABI, provider)      
//       const data = contract.interface.encodeFunctionData("attest", [chainParams])

//       let transaction = {
//         to: contractAddress,
//         from: account,
//         value: 0,
//         data,
//       }
//       console.log("transaction", transaction)
//       let tx = await signer?.sendTransaction(transaction)
//       console.log("transaction hash====>", tx.hash)
//       Swal.fire('Transaction sent successfully!')
//     } catch (err) {
//       Swal.fire(JSON.stringify(err))
//       console.log("error", err)
//       setVerifying(false)
//       setVerified(false)
//     }
//   }

//   return (
//     <form
//       action=""
//       className="bg-secondaryColor shadow-primaryShadow flex w-[508px] flex-col rounded-[5px] px-[35px] pb-[50px] pt-[17px] text-black"
//     >
//       {!verifying && 
//       <>
//       <h1 className="leading-default mb-6 text-center text-xl font-bold">
//         Verify Identity Using ZkPass 
//       </h1>
//       <div className="mb-[37px] flex flex-col gap-y-[37px]">
//         <h1 className="text-2xl">
//           Simple check to ensure you are verified on Binance , you must be KYC level {"<="} 2
//         </h1>
//       </div>
//       </>
//       }
//       {
//         verifying &&
//         <Spinner message="Finish Verifying your Binance KYC"/>
//       }
      
//       {!verified && <button className="bg-red-700 leading-default flex items-center justify-center self-center rounded-full px-[61px] py-[11.5px] text-center text-base font-semibold" onClick={ start}>
//           Verify
//       </button>}
//       {verified && <NavLink
//         to="/app"
//         className="bg-primaryColor leading-default flex items-center justify-center self-center rounded-full px-[61px] py-[11.5px] text-center text-base font-semibold"
//       >
//         Go to Dapp
//       </NavLink>}
//     </form>
//   );
// }

// export default CreateIdentityForm;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import Swal from "sweetalert2";
import Web3 from "web3";
import { Spinner } from "../ui";
import check from "../assets/9135401.png";
// import { ethers } from "ethers";

function CreateIdentityForm() {
  // const [result, setResult] = useState(null);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const schemaId = '98be81c858824ae98b64df38988669cd';
  const appId = '58ce1d6b-653f-4ca9-bf7f-9a704db0c8d6';


function verifyEVMMessageSignature(
  taskId,
  schema,
  uHash,
  publicFieldsHash,
  signature,
  originAddress
) {
  const web3 = new Web3();
  console.log("Schema is ----", schema)
  try {
    const types = ["bytes32", "bytes32", "bytes32", "bytes32"];
    const values = [
      web3.utils.stringToHex(taskId),
      web3.utils.stringToHex(schema),
      uHash,
      publicFieldsHash,
    ];

    // if (recipient) {
    //   types.push("address");
    //   values.push(recipient);
    // }

    console.log("Types:", types);
    console.log("Values:", values);

    const encodeParams = web3.eth.abi.encodeParameters(types, values);

    const paramsHash = String(web3.utils.soliditySha3(encodeParams));

    const nodeAddress = web3.eth.accounts.recover(paramsHash, signature);
    console.log("node address", nodeAddress)
    console.log("origin address", originAddress)
    return nodeAddress == originAddress;
  } catch (error) {
    console.error("Error in verifyEVMMessageSignature:", error);
    return false;
  }
}

  const start = async () => {
    setVerifying(true);
    try {
      
      const connector = new TransgateConnect(appId);
      const isAvailable = await connector.isTransgateAvailable();
      if (!isAvailable) {
        return Swal.fire("Please install zkPass TransGate");
      }

      //@ts-ignore
      if (window.ethereum == null) {
        return Swal.fire("MetaMask not installed");
      }

      //@ts-ignore
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const account = await signer.getAddress();
      // console.log("account is --- ", account)
      const res = await connector.launch(schemaId);
      // setResult(res);
      console.log("result is ---- ", res)

      const isVerified = verifyEVMMessageSignature(
        res.taskId,
          schemaId,
          res.uHash,
          res.publicFieldsHash,
          res.validatorSignature,
          res.validatorAddress
      );
      console.log("verifyResult", isVerified)
      setVerified(isVerified);
      setVerifying(false);

      if (!isVerified) {
        return Swal.fire("Verification failed");
      }
    } catch (err) {
      Swal.fire(JSON.stringify(err));
      console.log("error", err);
      setVerifying(false);
      setVerified(false);
    }
  };

  return (
    <form
      action=""
      className="bg-secondaryColor shadow-lg flex w-[508px] flex-col rounded-[5px] px-[35px] pb-[50px] pt-[17px] text-black"
    >
      {!verifying && (
        <>
          <h1 className="leading-default mb-6 text-center text-xl font-bold">
            Verify Identity Using ZkPass
          </h1>
          <div className="mb-[37px] flex flex-col gap-y-[37px]">
            <h1 className="text-2xl">
              User should be at least level 2 KYC on Binance
            </h1>
            {verified && <img src={check} />}
            {!verified &&<KYCLevel2Details />}
          </div>
        </>
      )}
      {verifying && <Spinner message="Finish Verifying your Binance KYC" />}
      {!verified && !verifying && (
        <button
          className="bg-red-700 leading-default flex items-center justify-center self-center rounded-full px-[61px] py-[11.5px] text-center text-base font-semibold"
          onClick={start}
          type="button"
        >
          Verify
        </button>
      )}
      {verified && !verifying && (
        <NavLink
          to="/app"
          className="bg-primaryColor leading-default flex items-center justify-center self-center rounded-full px-[61px] py-[11.5px] text-center text-base font-semibold"
        >
          Go to Dapp
        </NavLink>
      )}
    </form>
  );
}

const KYCLevel2Details = () => {
  const kycDetails = [
    "Provide comprehensive information and documents for verification",
    "Submit a valid government-issued photo ID",
    "Acceptable IDs include passport or driver's license",
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Binance KYC Level 2 - Intermediate Verification Usually entails </h2>
      <ul className="list-disc list-inside text-gray-700">
        {kycDetails.map((detail, index) => (
          <li key={index} className="mb-2 hover:bg-gray-100 p-2 rounded">
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CreateIdentityForm;
