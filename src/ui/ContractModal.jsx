import { useState, useEffect, useContext } from "react";
import { NFTStorage } from "nft.storage";
import Spinner from "./Spinner";
import Swal from "sweetalert2";
import { BlockchainContext } from "../context/BlockchainContext";
import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
const ContractModal = ({ contract }) => {
  const [rAddress, setRAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processDone, setProcessDone] = useState(false);

   
  const{address, createAgreement}  = useContext(BlockchainContext)

  const [contractContent, setContractContent] = useState([]);

  // Paste your NFT.Storage API key into the quotes:
  const NFT_STORAGE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVmOENlMGE2OTEyREMxNkYwZDI5NmM2YjE4MzE1ZDBhMzg5ZTJjZEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMDE4MjI1MjIyOCwibmFtZSI6IlByaXZ5UHJvb2YifQ.3I5Ga-LpkJnvmWAAv-jnq8rpEOjYPCw1l_aYySm7vs8";


  function storeNFT(userAddress) {
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    // call client.store, passing in the image & metadata
    return nftstorage.store({
      name: "Contract Data",
      userAddress,
      description: contract,
      image: new Blob(),
    });
  }

  const signMessage = async () => {
    try {
      console.log("init sign message");
      if (!rAddress) return;
      setIsLoading(true);
      const result = await storeNFT(rAddress);
      console.log("NFT stored");

      const ipfsHash = result.ipnft;
      console.log("IPFS HASHH IS )____,", ipfsHash);
      if (ipfsHash) {
        if (address) {
          const tx = await createAgreement(rAddress, ipfsHash);
          console.log("TXNNN STATTUSS-------", tx);
          setIsLoading(false);
          Swal.fire({
            title: "Good job!",
            text: "You have successfully created and signed your agreement",
            icon: "success",
          });
          setProcessDone(true);
        }
      } else {
        console.log("No IPFS HASH");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("ERROR IS ____", err);
      Swal.fire({
        title: "Error",
        text: "Your process failed, agreement could not be created ",
        icon: "error",
      });
    }
  };
// Helper function to format contract text
const formatContractText = (text) => {
  // Use regex to bold text before the colon and retain the colon
  const formattedText = text.replace(/([^:\n]+:)/g, '<span class="font-bold">$1</span>');
  // Split paragraphs by newlines for better readability
  return formattedText.split('\n').map((paragraph, index) => (
    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
  ));
};

   useEffect(() => {
    if (contract) {
      // Split the contract string into paragraphs by line breaks
      const paragraphs = formatContractText(contract)
      setContractContent(paragraphs);
    }
  }, [contract]);

  return (
    <div className="fixed inset-0 h-screen w-full overflow-y-auto bg-slate-900 bg-opacity-50 p-3">
      <div className="mx-auto my-auto  flex flex-col gap-y-4 rounded-lg bg-white p-5 shadow-lg">
       {!processDone && <> <h4 className="text-center font-bold">Contract Preview</h4>
        {contractContent.map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        <div className="flex flex-col gap-y-2">
          <label>Receiving Party Address</label>
          <input
            type="text"
            name="address"
            value={rAddress}
            onChange={(e) => setRAddress(e.target.value)}
            className="placeholder-text-300 rounded-full"
            placeholder="0x......."
          />
        </div>
        <button
          className="w-full rounded-full bg-[#0D47A1] p-2 text-white"
          onClick={signMessage}
        >
          Sign
        </button>
        </>}
        {processDone && 
        <NavLink
          to="/app"
          className="bg-primaryColor leading-default flex items-center justify-center self-center rounded-full px-[61px] py-[11.5px] text-center text-base font-semibold"
        >
          Go Back
        </NavLink>}
      </div>
      {isLoading && <Spinner message="Signing Contract..." />}
    </div>
  );
};

export default ContractModal;



