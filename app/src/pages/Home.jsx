// Modules
import React from 'react';
import {
	Flex,
	Stack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';

// Hooks
import { useAccount } from 'wagmi';

// Components
import WalletConnectors from '../components/home/WalletConnectors';
import Header from '../components/home/Header';
import Main from '../components/layout/Main';
import Search from '../components/home/Search';
import SocialShare from '../components/home/SocialShare';

const Home = () => {
	// Hooks
	const { isConnected } = useAccount();

	// State
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<Main>
			{isConnected && (
				<Search value={searchValue} handleChange={setSearchValue} />
			)}

			{searchValue === '' && (
				<Flex align={'center'} justify={'center'}>
					<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
						<Header />
						{isConnected ? (
							<WalletConnectors />
						) : (
							<Alert
								status="info"
								variant="subtle"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
								textAlign="center"
								height="200px"
							>
								<AlertIcon boxSize="40px" mr={0} />
								<AlertTitle mt={4} mb={1} fontSize="lg">
									Connect your wallet
								</AlertTitle>
								<AlertDescription maxWidth="sm">
									Please connect the wallet you'd like to
									manage your public profile with. If you lose
									access to this wallet, you won't be able to
									edit your Nexus profile.
								</AlertDescription>
							</Alert>
						)}

						<SocialShare />
					</Stack>
				</Flex>
			)}
		</Main>
	);
};

export default Home;
