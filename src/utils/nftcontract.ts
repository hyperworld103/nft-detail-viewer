import Web3 from "web3";
import { convertIpfsLink } from ".";
import { SocketAddress } from "net";
const NftAbi = require("./ERC721.json");
const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/zjgNU2S1-T4As5fLhUX0gJM5vBluW0Zj'))
let contract: any;
let address: string;

export function NftContract(nftAddress: string) {
   contract = new web3.eth.Contract(NftAbi, nftAddress);
   address = nftAddress;
   return contract;
}

export interface NftInfo {
   name: string;
   symbol: string;
   totalSupply: string;
   address: string;
}

export interface Metadata {
   attributes: Array<object>;
   image: string;
   owner: string;
   id: number;
   address: string;
   symbol: string;
}

export async function getNftInfo(): Promise<NftInfo> {
   const name = await contract.methods.name().call();
   const symbol = await contract.methods.symbol().call();
   const totalSupply = await contract.methods.totalSupply().call();
   console.log(contract, name, symbol, totalSupply)
   return {
      name, symbol, totalSupply, address
   }
}

export async function getMetadata(address: string, id: number): Promise<Metadata> {
   console.log(contract)
   const uri = await contract.methods.tokenURI(id).call();
   const owner = await contract.methods.ownerOf(id).call();
   const symbol = await contract.methods.symbol().call();
   const data =  await fetch(convertIpfsLink(uri)).then(res => res.json());

   return {
      id: id,
      owner: owner,
      address: address,
      symbol: symbol,
      attributes: data.attributes,
      image: convertIpfsLink(data.image)
   };
}
