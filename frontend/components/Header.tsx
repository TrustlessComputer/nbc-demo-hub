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
