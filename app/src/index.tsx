// Modules
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';

// Components
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// Providers
import { Auth0Provider } from '@auth0/auth0-react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ContractContextProvider } from './contexts/ContractContext';

// Other
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from './rainbow';
import { auth0Config } from './config';
import { AlertProvider } from './contexts/AlertContext';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={auth0Config.domain || ''}
			clientId={auth0Config.clientId || ''}
			redirectUri={window.location.origin}
			cacheLocation={'localstorage'}
			useRefreshTokens={true}
			maxAge={604800} // 7 days
		>
			<WagmiConfig client={wagmiClient}>
				<AlertProvider>
					<ContractContextProvider>
						<RainbowKitProvider
							modalSize="compact"
							coolMode
							chains={chains}
						>
							<ColorModeScript />
							<App />
						</RainbowKitProvider>
					</ContractContextProvider>
				</AlertProvider>
			</WagmiConfig>
		</Auth0Provider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
