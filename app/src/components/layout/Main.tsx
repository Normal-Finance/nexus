// Modules
import { ReactNode } from 'react';
import {
	IconButton,
	Avatar,
	Image,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Heading,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Button,
	Tag,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
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
// import Footer from '../home/Footer';
import ConfirmDeleteProfile from '../modals/ConfirmDeleteProfile';
import WalletOptions from '../modals/WalletOptions';
import { useContract } from '../../contexts/ContractContext';

export default function Main({ children }: { children: ReactNode }) {
	// Hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
				{/* <Footer /> */}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	// Hooks
	const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
	const { getWallets } = useContract();
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

			{getWallets.data !== undefined ? (
				<>
					{isConnected && (
						<>
							<Heading
								as="h2"
								size="sm"
								mt={6}
								mb={2}
								style={{ textAlign: 'center' }}
							>
								Connected wallets (
								{isConnected ? getWallets.data.length : '0'})
							</Heading>

							{!!getWallets.loading && getWallets.data && (
								<>
									{getWallets.data.map(
										(wallet: any, index: number) => {
											return (
												<div key={index}>
													<div onClick={onOpen}>
														<NavItem
															provider={
																wallet.provider
															}
															name={wallet.name}
															address={
																wallet._address
															}
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
										}
									)}
								</>
							)}
						</>
					)}
				</>
			) : (
				<p>none</p>
			)}
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	provider: string;
	name: string;
	address: string;
}
const NavItem = ({ provider, name, address }: NavItemProps) => {
	return (
		<Link
			href="#"
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
			>
				<Avatar
					size="sm"
					mr="4"
					fontSize="16"
					_groupHover={{
						color: 'white',
					}}
					name={provider}
					src={`/walletProviders/${provider}.png`}
				/>
				<Text>{name}</Text>
			</Flex>
		</Link>
	);
};

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

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return isAuthenticated ? (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			// bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			// borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<div
				style={{
					marginRight: '2rem',
				}}
			>
				<ConnectButton />
			</div>

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
						// bg={useColorModeValue('white', 'gray.900')}
						// borderColor={useColorModeValue(
						// 	'gray.200',
						// 	'gray.700'
						// )}
						>
							<ColorModeSwitcher justifySelf="flex-end" />

							{isConnected && (
								<Button
									variant={'solid'}
									colorScheme={'red'}
									size={'sm'}
									mr={4}
									leftIcon={<DeleteIcon />}
									onClick={onConfirmDeleteOpen}
								>
									Delete profile
								</Button>
							)}

							<MenuDivider />

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
	) : (
		<p>none</p>
	);
};
