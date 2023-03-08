import { useState } from "react";
import { Metadata, NftInfo } from "../utils/nftcontract";
import { DetailViewModal } from "./DetailViewModal";
import NftCard from "./NftCard";

export default function NftBoard({
  nftInfo,
}: {
  nftInfo: undefined | NftInfo;
}) {
  let [metadata, setMetadata] = useState<Metadata>();

  if (!nftInfo) return <></>;
  let ids = [];
  //   for(let i = 0; i < Number(nftInfo.totalSupply); i++) ids.push(i);
  for (let i = 0; i <= 5; i++) ids.push(i);

  const detailView = (_metadata: Metadata) => {
    setMetadata(_metadata);
  };

  return (
    <div>
      <div className="inline-flex gap-10 my-2">
        <div>
          Name <span className="text-gray-700 font-bold">{nftInfo?.name}</span>
        </div>
        <div>
          Symbol{" "}
          <span className="text-gray-700 font-bold">{nftInfo?.symbol}</span>
        </div>
        <div>
          TotalSupply{" "}
          <span className="text-gray-700 font-bold">
            {nftInfo?.totalSupply}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {ids.map((id) => (
          <NftCard address={nftInfo.address} id={id} key={id} detailView={detailView} />
        ))}
      </div>
      <DetailViewModal isOpen={metadata !== undefined} setIsOpen={() => setMetadata(undefined)} metadata={metadata}/>
    </div>
  );
}
