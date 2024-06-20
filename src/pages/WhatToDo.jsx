import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {  ContractModal, Spinner } from "../ui";
import { BlockchainContext } from "../context/BlockchainContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function WhatToDo() {
  const[contractId, setContractId] = useState("")
  const[data, setData] =  useState(null);
  const[fetching, setFetching] = useState(false)
  const[fetched, setFetched] = useState(false)

  const {getAgreementDetails, address} = useContext(BlockchainContext);

  const fetchFromIPFS = async(ipfsHash) => {
     if (ipfsHash) {
      try {
        const resData= await axios({
          method: "get",
          url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
        });
        console.log("raw data is ", resData);
        const Data = resData.data;
        console.log(Data);

        return Data;
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error fetching DATA from  IPFS: ");
        console.log(error);
      }
    }
  }

  const fetchContractDetails = async() => {
    if(!contractId) return;
    try{
    setFetching(true)
    const details = await getAgreementDetails(contractId)
    console.log("details", details)
    const fetchedData = await fetchFromIPFS(details[6])
    console.log("fetched details", fetchedData)
    setData(fetchedData);
    setFetching(false)
    if(details[0] == address){
      setFetched(true);
    }else{
        Swal.fire({
        title: "Error",
        text: "This is not your contract",
        icon: "error",
      });
    }

    
      }
      catch(err){
        console.log(err)
        setFetching(false);
        setFetched(false);
      }
  }
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[88px] flex w-[508px] flex-col bg-secondaryColor px-[13px] pb-[67px] pt-[17px] text-center text-black">
        <h1 className="mb-[58px] text-center text-xl font-bold leading-default">
          Do you want to
        </h1>
         <div className="m-4">
                <label className="text-base font-semibold leading-default text-black">
                  Contract ID
                </label>
                <input
                  type="text"
                  name="contractId"
                  value={contractId}
                  onChange={(e) => setContractId(e.target.value)}
                  placeholder="Enter contract ID"
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-1"
                />
              </div>
        <button className="flex w-full justify-center rounded-full bg-primaryColor py-3 text-base font-semibold leading-default" onClick={fetchContractDetails}>
          Sign a contract
        </button>
        <h6 className="my-[25px] text-base font-bold leading-default">or</h6>
        <NavLink to="/app/contract-draft">
           <button className="flex w-full justify-center rounded-full bg-primaryColor py-3 text-base font-semibold leading-default">
          Create a contract
        </button>
        </NavLink>
       { data && fetched && <ContractModal contract={data} contractId={contractId} signer={true}/>}
       {fetching && <Spinner message="Fetching Contract Details"/>}
      </div>
    </div>
  );
}
