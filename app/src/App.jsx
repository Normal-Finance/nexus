// Modules
import { ChakraProvider, theme } from '@chakra-ui/react';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';

// Components
import Signin from './pages/Signin';
import Home from './pages/Home';

export const App = () => {
	const { isAuthenticated, isLoading, logout } = useAuth0();

	// if (isLoading) {
	// 	return <div>Loading ...
	// 		{/* <button onClick={logout({
	// 									returnTo: window.location.origin,
	// 								})}>Log out</button> */}
	// 	</div>;
	// }

	return (
		<ChakraProvider theme={theme}>
			{isAuthenticated ? <Home /> : <Signin />}
		</ChakraProvider>
	);
};
