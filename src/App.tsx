import React, { useEffect, useMemo, useState } from "react";
import { NftContract, getNftInfo, NftInfo } from "./utils/nftcontract";
import NftBoard from "./components/NftBoard";



function App() {
  const [nftAddress, setNftAddress] = useState<string>("");
  const [nftContract, setNftContract] = useState<any>();
  const [nftInfo, setNftInfo] = useState<NftInfo>();

  const searchHandle = () => {
    setNftContract(NftContract(nftAddress));
  }
  

  useEffect(() => {
    if(nftContract) {
      getNftInfo().then((res: NftInfo) => {
        setNftInfo(res)
      });
    }
  }, [nftContract])

  return (
    <div className="mx-10">
      <div className="font-semibold text-gray-500">Support Ethereum</div>
      <div className="flex justify-between max-w-[580px] mx-auto my-[30px]">
        <div className="flex items-center">
          <div>Nft Address</div>
          <input className="outline-none border border-black ml-2 w-[380px] p-1 rounded-sm" value={nftAddress} onChange={(e) => setNftAddress(e.target.value)}/>
        </div>
        <button className="bg-gray-700 text-white px-3 py-1 rounded" onClick={searchHandle}>
          Search
        </button>
      </div>
      <NftBoard nftInfo={nftInfo} />
    </div>
  );
}

export default App;
