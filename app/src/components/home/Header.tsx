import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';

const Header = () => {
	return (
		<Stack align={'center'}>
			<Heading fontSize={'4xl'}>Connect your wallets</Heading>
			<Text fontSize={'lg'} color={'gray.600'}>
				with all the benefits of Normal ✌️
			</Text>
		</Stack>
	);
};

export default Header;
