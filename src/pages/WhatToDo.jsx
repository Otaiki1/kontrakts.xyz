import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ContractModal, Spinner } from "../ui";
import { BlockchainContext } from "../context/BlockchainContext";

export default function WhatToDo() {
  const[contractId, setContractId] = useState("")
  const[data, setData] =  useState(null);
  const[fetching, setFetching] = useState(false)
  const[fetched, setFetched] = useState(false)

  const {getAgreementDetails} = useContext(BlockchainContext);

  const fetchContractDetails = async() => {
    if(!contractId) return;
    try{
    setFetching(true)
    const details = await getAgreementDetails(contractId)
    setData(details);
    setFetching(false)
    setFetched(true);
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
         <div>
                <label className="text-base font-semibold leading-default text-black">
                  Contract ID
                </label>
                <input
                  type="text"
                  name="contractId"
                  value={contractId}
                  onChange={(e) => setContractId(e.target.value)}
                  placeholder="Enter contract ID"
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
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
       { data && fetched && <ContractModal contract={data} />}
       {fetching && <Spinner messsage="Fetching Contract Details"/>}
      </div>
    </div>
  );
}
