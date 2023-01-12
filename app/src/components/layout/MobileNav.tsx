// Modules
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	useColorModeValue,
	Button,
	Text,
	useDisclosure,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spinner,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Icons
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { DeleteIcon } from '@chakra-ui/icons';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';
import { useAccount } from 'wagmi';

// Components
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import ConfirmDeleteProfile from '../modals/ConfirmDeleteProfile';
import { useContract } from '../../contexts/ContractContext';

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	// Hooks
	const {
		isOpen: isConfirmDeleteOpen,
		onOpen: onConfirmDeleteOpen,
		onClose: onConfirmDeleteClose,
	} = useDisclosure();
	const { user, isAuthenticated, isLoading, logout } = useAuth0();
	const { isConnected } = useAccount();
	const { getWallets } = useContract();

	// if (isLoading) {
	// 	return <div>Loading ...</div>;
	// }

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<div
				style={{
					marginRight: '1rem',
				}}
			>
				<ConnectButton />
			</div>

			<ColorModeSwitcher
				style={{
					marginRight: '1rem',
				}}
				justifySelf="flex-end"
			/>

			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<HStack spacing={{ base: '0', md: '6' }}>
				{/* User Menu */}
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: 'none' }}
						>
							<HStack>
								<Avatar size={'sm'} src={user?.picture} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">
										{user?.name || 'Cannot find name'}
									</Text>
									<Text fontSize="xs" color="gray.600">
										{user?.email || 'Cannot find email'}
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue(
								'gray.200',
								'gray.700'
							)}
						>
							{/* Delete Profile */}
							{!getWallets.isLoading && !getWallets.isError && (
								<>
									{/* No error */}
									{!getWallets.isError && (
										<>
											<div
												style={{ textAlign: 'center' }}
											>
												<Button
													variant={'solid'}
													colorScheme={'red'}
													size={'sm'}
													mr={4}
													leftIcon={<DeleteIcon />}
													onClick={
														onConfirmDeleteOpen
													}
												>
													Delete profile
												</Button>
											</div>
											<MenuDivider />
										</>
									)}
								</>
							)}

							<MenuItem
								onClick={() =>
									logout({
										returnTo: window.location.origin,
									})
								}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>

			<ConfirmDeleteProfile
				isOpen={isConfirmDeleteOpen}
				onClose={onConfirmDeleteClose}
			/>
		</Flex>
	);
};

export default MobileNav;
