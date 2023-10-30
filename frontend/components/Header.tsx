import Link from "next/link";
import Image from "next/image";
import { Global, Currency } from "state/global";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {useAccount, useContractRead} from "wagmi";
import {TOKEN_ABI,BTC_CONTRACT_ADDRESS} from "../utils";
import { useEffect, useState } from "react";

export default function Header() {
  const { address, isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const { data: ownedAmount }: { data: BigInt | undefined } = useContractRead({
    address: BTC_CONTRACT_ADDRESS as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  return (
    <div className="sticky top-0 z-50">
      {/* Sub header */}
      <div className="bg-black border-b border-zinc-800 flex items-center justify-center py-0.5">
        <span className="text-xs text-zinc-400">
          An{" "}
          <a
            href="https://github.com/TrustlessComputer/nbc-demo-hub"
            target="_blank"
            rel="noopen noreferrer"
            className="hover:opacity-70 transition-opacity underline"
          >
            open-source
          </a>{" "}
          project of NBC &nbsp;
          <a
            href="https://alpha-3.gitbook.io/nbc-backend-call/"
            target="_blank"
            rel="noopen noreferrer"
            className="hover:opacity-70 transition-opacity underline"
          >
             view technical doc here
          </a>
        </span>
      </div>
      {/* Main header */}
      <div className="flex justify-between h-14 px-4 items-center bg-black">
        <div>

        </div>

        <div  className="flex items-center gap-4">
          {isConnected && ownedAmount!=undefined &&isClient?
          <div style={{color:"red",fontWeight:"bold"}} >{Number(Number(ownedAmount)/ 1e18 ?? 0).toFixed(6)} BTC </div>
              :""}
          <div className="md:flex hidden">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
