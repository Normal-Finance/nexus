// Modules
import { useContext, createContext, useEffect, useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { useAuth0 } from '@auth0/auth0-react';

// Contracts
import NexusContract from '../build/contracts/Nexus.json';

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
	// Hooks
	const { user, isAuthenticated } = useAuth0();

	// State
	const [userHash, setUserHash] = useState('');

	/** SMART CONTRACT - NEXUS */
	// createProfile
	const {
		data: createProfileData,
		write: createProfile,
		error: createProfileError,
		isError: isCreateProfileError,
		isLoading: isCreateProfileLoading,
		isSuccess: isCreateProfileStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'createProfile',
	});

	// getWallets
	const {
		data: getWalletsData,
		error: getWalletsError,
		isError: isGetWalletsError,
		isLoading: isGetWalletsLoading,
		isSuccess: isGetWalletsStarted,
		refetch: refetchGetWallets,
		isRefetching: isGetWalletsRefetching,
	} = useContractRead({
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'getWallets',
		args: [userHash],
	});

	// deleteProfile
	const {
		data: deleteProfileData,
		write: deleteProfile,
		error: deleteProfileError,
		isError: isDeleteProfileError,
		isLoading: isDeleteProfileLoading,
		isSuccess: isDeleteProfileStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'deleteProfile',
	});

	// updateWallet
	const {
		data: updateWalletData,
		write: updateWallet,
		error: updateWalletError,
		isError: isUpdateWalletError,
		isLoading: isUpdateWalletLoading,
		isSuccess: isUpdateWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'updateWallet',
	});

	// insertWallet
	const {
		data: insertWalletData,
		write: insertWallet,
		error: insertWalletError,
		isError: isInsertWalletError,
		isLoading: isInsertWalletLoading,
		isSuccess: isInsertWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'insertWallet',
	});

	// deleteWallet
	const {
		data: deleteWalletData,
		write: deleteWallet,
		error: deleteWalletError,
		isError: isDeleteWalletError,
		isLoading: isDeleteWalletLoading,
		isSuccess: isDeleteWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'deleteWallet',
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const url = `${
					process.env.REACT_APP_NEXUS_API_PATH
				}/user/hash?email=${user?.email || ''}`;
				const requestOptions = {
					method: 'GET',
					headers: {
						'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
					},
				};
				const response = await fetch(url, requestOptions);
				const { hash } = await response.json();
				console.log(hash);

				setUserHash(hash);
			} catch (error) {
				console.log('error', error);
			}
		}

		if (isAuthenticated) fetchData();
	}, [isAuthenticated]);

	/** FUNCTIONS */
	const executeCreateProfile = (
		address,
		name,
		description,
		provider,
		chain
	) => {
		createProfile?.({
			recklesslySetUnpreparedArgs: [
				userHash,
				address,
				name,
				description,
				provider,
				chain,
			],
		});
	};

	const executeDeleteProfile = () => {
		deleteProfile?.({ recklesslySetUnpreparedArgs: [userHash] });
	};

	const executeUpdateWallet = (index, name, description) => {
		updateWallet?.({
			recklesslySetUnpreparedArgs: [userHash, index, name, description],
		});
	};

	const executeInsertWallet = (
		address,
		name,
		description,
		provider,
		chain
	) => {
		insertWallet?.({
			recklesslySetUnpreparedArgs: [
				userHash,
				address,
				name,
				description,
				provider,
				chain,
			],
		});
	};

	const executeDeleteWallet = (index) => {
		deleteWallet?.({ recklesslySetUnpreparedArgs: [userHash, index] });
	};

	return (
		<ContractContext.Provider
			value={{
				userHash,
				createProfile: {
					data: createProfileData,
					isError: isCreateProfileLoading,
					error: createProfileError,
					loading: isCreateProfileLoading,
					started: isCreateProfileStarted,
				},
				executeCreateProfile,
				deleteProfile: {
					data: deleteProfileData,
					isError: isDeleteProfileLoading,
					error: deleteProfileError,
					loading: isDeleteProfileLoading,
					started: isDeleteProfileStarted,
				},
				executeDeleteProfile,
				getWallets: {
					data: getWalletsData,
					isError: isGetWalletsError,
					error: getWalletsError,
					loading: isGetWalletsLoading,
					started: isGetWalletsStarted,
					refetch: refetchGetWallets,
					isRefetching: isGetWalletsRefetching,
				},
				updateWallet: {
					data: updateWalletData,
					isError: isUpdateWalletLoading,
					error: updateWalletError,
					loading: isUpdateWalletLoading,
					started: isUpdateWalletStarted,
				},
				executeUpdateWallet,
				insertWallet: {
					data: insertWalletData,
					isError: isInsertWalletLoading,
					error: insertWalletError,
					loading: isInsertWalletLoading,
					started: isInsertWalletStarted,
				},
				executeInsertWallet,
				deleteWallet: {
					data: deleteWalletData,
					isError: isDeleteWalletLoading,
					error: deleteWalletError,
					loading: isDeleteWalletLoading,
					started: isDeleteWalletStarted,
				},
				executeDeleteWallet,
			}}
		>
			{children}
		</ContractContext.Provider>
	);
};

export const useContract = () => {
	return useContext(ContractContext);
};
