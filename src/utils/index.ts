export function convertIpfsLink(link: string): string {
   let res = link;
   res = res.replace("ipfs://", "https://ipfs.io/ipfs/");
   return res;
}
