// Modules
import { useContext, createContext, useEffect, useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { useAuth0 } from '@auth0/auth0-react';

// Contracts
import NexusContract from '../build/contracts/Nexus.json';

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
	// Hooks
	const { user } = useAuth0();

	// State
	const [userHash, setUserHash] = useState('');

	/** SMART CONTRACT - NEXUS */
	// createProfile
	const {
		data: createProfileData,
		write: createProfile,
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
		isLoading: isGetWalletsLoading,
		isSuccess: isGetWalletsStarted,
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
		isLoading: isDeleteProfileLoading,
		isSuccess: isDeleteProfileStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: NexusContract.address,
		abi: NexusContract.abi,
		functionName: 'deleteProfile',
	});

	// insertWallet
	const {
		data: insertWalletData,
		write: insertWallet,
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

		fetchData();
	}, [user]);

	/** FUNCTIONS */
	const verifyUser = async () => {
		try {
			const url = `${process.env.REACT_APP_NEXUS_API_PATH}/user/verify`;
			const requestOptions = {
				method: 'POST',
				headers: {
					'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
				},
				body: JSON.stringify({ email: user?.email || '' }),
			};
			const response = await fetch(url, requestOptions);
			const json = await response.json();
			console.log(json);
		} catch (error) {
			console.log('error', error);
		}
	};

	const executeCreateProfile = () => {
		createProfile?.(userHash);
	};

	const executeDeleteProfile = () => {
		deleteProfile?.(userHash);
	};

	const executeInsertWallet = () => {
		insertWallet?.(userHash);
	};

	const executeDeleteWallet = () => {
		deleteWallet?.(userHash);
	};

	return (
		<ContractContext.Provider
			value={{
				userHash,
				createProfile: {
					data: createProfileData,
					loading: isCreateProfileLoading,
					started: isCreateProfileStarted,
				},
				executeCreateProfile,
				deleteProfile: {
					data: deleteProfileData,
					loading: isDeleteProfileLoading,
					started: isDeleteProfileStarted,
				},
				executeDeleteProfile,
				getWallets: {
					data: getWalletsData,
					loading: isGetWalletsLoading,
					started: isGetWalletsStarted,
				},
				insertWallet: {
					data: insertWalletData,
					loading: isInsertWalletLoading,
					started: isInsertWalletStarted,
				},
				executeInsertWallet,
				deleteWallet: {
					data: deleteWalletData,
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
