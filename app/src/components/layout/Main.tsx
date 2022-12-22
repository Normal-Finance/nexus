import React, { ReactNode } from 'react';
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
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { UserAuth } from '../../context/AuthContext';
import { useAccount } from 'wagmi';

import config from '../../build/contracts/Nexus.json';
import { useContractRead } from 'wagmi';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { DeleteIcon } from '@chakra-ui/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Footer from '../home/Footer';
import { ethers } from 'ethers';
import ConfirmDeleteProfile from '../modals/ConfirmDeleteProfile';
import WalletOptions from '../modals/WalletOptions';
import { tempPhoneNumber } from '../../constants';
import sha256 from 'crypto-js/sha256';

interface LinkItemProps {
	name: string;
	icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome },
	{ name: 'Trending', icon: FiTrendingUp },
	{ name: 'Explore', icon: FiCompass },
	{ name: 'Favourites', icon: FiStar },
	{ name: 'Settings', icon: FiSettings },
];

export default function Main({ children }: { children: ReactNode }) {
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
	const { isConnected } = useAccount();

	// Smart Contract
	const {
		data: wallets,
		isError,
		isLoading,
	}: any = useContractRead({
		address: config.address,
		abi: config.abi,
		functionName: 'getWallets',
		args: ['0x' + sha256(tempPhoneNumber).toString()],
	});

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

			{wallets !== undefined ? (
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
								{isConnected ? wallets.length : '0'})
							</Heading>

							{!isError && !isLoading && wallets && (
								<>
									{wallets.map(
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
	const { user, logOut } = UserAuth();
	// Hooks
	const { isConnected } = useAccount();
	const {
		isOpen: isConfirmDeleteOpen,
		onOpen: onConfirmDeleteOpen,
		onClose: onConfirmDeleteClose,
	} = useDisclosure();

	const PNF = require('google-libphonenumber').PhoneNumberFormat;
	const phoneUtil =
		require('google-libphonenumber').PhoneNumberUtil.getInstance();
	const number = phoneUtil.parseAndKeepRawInput(tempPhoneNumber, 'US');

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
								<Avatar size={'sm'} src={user.photoURL} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">
										{user?.displayName ||
											'Cannot find name'}
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
							<MenuItem>
								{phoneUtil.format(number, PNF.INTERNATIONAL)}
							</MenuItem>

							<MenuDivider />

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

							<MenuItem onClick={logOut}>Sign out</MenuItem>
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
