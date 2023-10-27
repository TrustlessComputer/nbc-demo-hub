import { Global } from "state/global";
import type { AppProps } from "next/app";

// CSS imports
import "global.css";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

// RainbowKit
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {bsc, mainnet} from "viem/chains";
import {NON_STANDARD_NODE_ENV} from "next/dist/lib/constants";
import { defineChain } from 'viem'

export const nos = defineChain({
  id: 42213,
  name: 'Nos',
  network: 'Nos',
  nativeCurrency: {
    decimals: 18,
    name: 'TC',
    symbol: 'TC',
  },
  rpcUrls: {
    default: {
      http: ['https://node.l2.trustless.computer/'],
      webSocket: ['wss://node.l2.trustless.computer/'],
    },
    public: {
      http: ['https://node.l2.trustless.computer/'],
      webSocket: ['wss://node.l2.trustless.computer/'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.l2.trustless.computer/' },
  },
})

// Setup provider
const { chains, publicClient } = configureChains([nos], [publicProvider()]);

// Setup connector
const { connectors } = getDefaultWallets({
  appName: "alphamex",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  chains,
});

// Setup Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function FriendMEX({ Component, pageProps }: AppProps) {
  return (
    // Wrap in RainbowKit providers
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
