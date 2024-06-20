import { ApolloClient, InMemoryCache, gql} from "@apollo/client";
import { useEffect } from "react";
// import { useEffect } from "react";

function ContractPreview() {
   const queryUrl =
    "https://api.studio.thegraph.com/query/57950/contractxyz/v0.0.1";

  const client = new ApolloClient({
    uri: queryUrl,
    cache: new InMemoryCache(),
  });

  const getContractCreated = gql`
    query {
      {
    agreementCreateds(first: 5) {
      id
      agreementId
      party1
      party2
    }
    agreementDeleteds(first: 5) {
      id
      agreementId
      party1
      blockNumber
  }
}
  `;

  async function fetchMyContracts() {
    try{
      const { data } = await client.query({ query: getContractCreated });
      console.log("data --- ----", data);
    }catch(err){
      console.log("error is ", err)
    }
    }

 

 useEffect(()=>{
    fetchMyContracts();
    return ()=>{}
 }, [getContractCreated, fetchMyContracts])

  return (<div>
    ContractPreview
    <button onClick={fetchMyContracts}>
      show me 
    </button>
  </div>)
}

export default ContractPreview;
