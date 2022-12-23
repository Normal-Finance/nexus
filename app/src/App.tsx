// Modules
import { ChakraProvider, theme } from '@chakra-ui/react';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';

// Components
import Signin from './pages/Signin';
import Home from './pages/Home';

export const App = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<ChakraProvider theme={theme}>
			{isAuthenticated ? <Home /> : <Signin />}
		</ChakraProvider>
	);
};
