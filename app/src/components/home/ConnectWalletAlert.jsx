import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';

const ConnectWalletAlert = () => {
	return (
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
				Please connect the wallet you'd like to manage your public
				profile with. If you lose access to this wallet, you won't be
				able to edit your Nexus profile.
			</AlertDescription>
		</Alert>
	);
};

export default ConnectWalletAlert;
