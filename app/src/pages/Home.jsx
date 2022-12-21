// Modules
import React from 'react';
import { Flex, Stack } from '@chakra-ui/react';

// Components
import WalletConnectors from '../components/home/WalletConnectors';
import Header from '../components/home/Header';
import Main from '../components/layout/Main';
import Search from '../components/home/Search';

const Home = () => {
	// State
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<Main>
			<Search value={searchValue} handleChange={setSearchValue} />

			{searchValue === '' && (
				<Flex
					minH={'100vh'}
					align={'center'}
					justify={'center'}
					// bg={useColorModeValue('gray.50', 'gray.800')}
				>
					<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
						<Header />
						<WalletConnectors />
					</Stack>
				</Flex>
			)}
		</Main>
	);
};

export default Home;
