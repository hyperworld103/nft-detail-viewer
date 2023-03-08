import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Metadata } from "../utils/nftcontract";

export function DetailViewModal({
  metadata,
  isOpen,
  setIsOpen,
}: {
  metadata?: Metadata;
  isOpen: boolean;
  setIsOpen: Function;
}) {
  if (!metadata) return <div></div>;
  console.log(metadata);
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen()} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-4">
          <Dialog.Title className="text-lg font-bold">
            {metadata.symbol} #{metadata.id}
          </Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <div className="flex gap-5">
            <div>
              <div className="mt-3">
                <span className="bg-gray-300 px-2 py-1 rounded">Owner</span>
                <div>{metadata.owner}</div>
              </div>
              <div className="mt-3">
                <span className="bg-gray-300 px-2 py-1 rounded mt-3">Attributes</span>
                {metadata.attributes && metadata.attributes.map((attribute: any) => {
                  return (
                    <div className="flex">
                      <div className="font-semibold">
                        {attribute.trait_type}
                      </div>
                      <div className="ml-3">{attribute.value}</div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  window.open(
                    `https://opensea.io/assets/ethereum/${metadata.address}/${metadata.id}`
                  )
                }
                className="bg-gray-700 px-4 py-1 text-white rounded align-middle mt-3 outline"
              >
                Buy NFT
              </button>
            </div>
            <div>
               <img src={metadata.image} width={300} height={300} />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
