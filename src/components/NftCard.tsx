import { useEffect, useState } from "react"
import { getMetadata } from "../utils/nftcontract"
import { convertIpfsLink } from "../utils";

export default function NftCard({address, id, detailView}: {address: string, id: number, detailView: Function}) {
   const [metadata, setMetadata] = useState<any>();
   useEffect(() => {
      getMetadata(address, id).then((_metadata) => setMetadata(_metadata))
   }, [id, address])
   
   if(!metadata) return <div></div>
   return (
      <div className="relative cursor-pointer" onClick={() => detailView(metadata)}>
         <img src={metadata.image}/>
         <span className="absolute top-2 right-3 bg-gray-500/30 w-[60px] text-center rounded">#{id}</span>
      </div>
   )
}