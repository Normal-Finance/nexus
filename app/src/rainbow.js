import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';

// Providers
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';

export const { chains, provider, webSocketProvider } = configureChains(
	[goerli, mainnet, polygon, optimism, arbitrum],
	[
		// alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: 'Normal - Nexus',
	chains,
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});
