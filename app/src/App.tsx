import * as React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';

import { UserAuth } from './context/AuthContext';
import Signin from './pages/Signin';
import Home from './pages/Home';

export const App = () => {
	const { user } = UserAuth();

	return (
		<ChakraProvider theme={theme}>
			{user === null ? <Signin /> : <Home />}
		</ChakraProvider>
	);
};
