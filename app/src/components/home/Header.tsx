// Modules
import { Stack, Heading, Text } from '@chakra-ui/react';

const Header = () => {
	return (
		<Stack align={'center'}>
			<Heading fontSize={'4xl'}>Connect your wallets</Heading>
			<Text fontSize={'lg'} color={'gray.600'}>
				with the global Nexus network ✌️
			</Text>
		</Stack>
	);
};

export default Header;
