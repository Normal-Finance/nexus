// Modules
import {
	Box,
	Flex,
	Image,
	CloseButton,
	Heading,
	useColorModeValue,
	useDisclosure,
	BoxProps,
} from '@chakra-ui/react';

// Hooks
import { useAccount } from 'wagmi';
import { useContract } from '../../contexts/ContractContext';

// Components
import NavItem from './NavItem';
import WalletOptions from '../modals/WalletOptions';

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	// Hooks
	const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
	const { getWallets } = useContract();
	console.log(getWallets.data);
	const { isConnected } = useAccount();

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
			>
				<Image objectFit="cover" src="/logo.png" alt="Normal Logo" />
				<CloseButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
				/>
			</Flex>

			<Heading
				as="h2"
				size="sm"
				mt={6}
				mb={2}
				style={{ textAlign: 'center' }}
			>
				Connected wallets ({getWallets?.data?.length || '0'})
			</Heading>

			{!getWallets.loading && getWallets.data && (
				<>
					{getWallets.data.map((wallet: any, index: number) => {
						return (
							<div key={index}>
								<div onClick={onOpen}>
									<NavItem
										provider={wallet.provider}
										name={wallet.name}
										address={wallet.walletAddress}
									/>
								</div>
								<WalletOptions
									isOpen={isOpen}
									wallet={wallet}
									walletIndex={index}
									onClose={_onClose}
								/>
							</div>
						);
					})}
				</>
			)}
		</Box>
	);
};

export default SidebarContent;
