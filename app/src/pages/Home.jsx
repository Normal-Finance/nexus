// Modules
import React from 'react';
import { Spinner, Stack } from '@chakra-ui/react';

// Hooks
import { useAccount } from 'wagmi';

// Components
import UpdateProfileForm from '../components/home/UpdateProfileForm';
import Header from '../components/home/Header';
import Main from '../components/layout/Main';
import Search from '../components/home/Search';
import SocialShare from '../components/home/SocialShare';
import Donate from '../components/home/Donate';
import ConnectWalletAlert from '../components/home/ConnectWalletAlert';
import { useContract } from '../contexts/ContractContext';
import VerifyUser from '../components/home/VerifyUser';
import Error from '../components/other/Error';

const Home = () => {
	// Hooks
	const { isConnected } = useAccount();
	const { getWallets } = useContract();

	// State
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<Main>
			<Search value={searchValue} handleChange={setSearchValue} />

			{searchValue === '' && (
				<Stack spacing={12} mx={'auto'} maxW={'xl'} py={12} px={6}>
					<Header />

					{/* Loading */}
					{getWallets.isLoading && <Spinner />}

					{/* Done loading */}
					{!getWallets.isLoading && (
						<>
							{/* Error */}
							{getWallets.isError && (
								<>
									{getWallets?.error?.reason ===
									'Caller must be authorized' ? (
										<VerifyUser />
									) : (
										<Error
											message={
												'We were unable to load your wallets'
											}
										/>
									)}
								</>
							)}

							{/* No error */}
							{!getWallets.isError && (
								<>
									{isConnected && <UpdateProfileForm />}
									{!isConnected && <ConnectWalletAlert />}
								</>
							)}
						</>
					)}

					{/* <SocialShare />
					<Donate /> */}
				</Stack>
			)}
		</Main>
	);
};

export default Home;
