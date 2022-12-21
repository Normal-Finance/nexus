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
	Icon,
	FormControl,
	FormLabel,
	Input,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Button,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
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
import { ReactText } from 'react';
import { UserAuth } from '../../context/AuthContext';

import config from '../../build/contracts/Nexus.json';
import { useContractRead } from 'wagmi';

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
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const { isOpen, onOpen, onClose: _onClose } = useDisclosure();

	const { data, isError, isLoading }: any = useContractRead({
		address: '0xCf81F51D7C6D1F1983C11F6749c100c862A3482e',
		abi: config.abi,
		functionName: 'getWallets',
		args: [
			'0x1e67fc6860000000000000000000000000000000000000000000000000000000',
		],
	});

	const updateWallet = () => {};

	const deleteWallet = () => {};

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

			{!isError && !isLoading && data && (
				<>
					{data.map((wallet: any) => {
						return (
							<NavItem
								key={wallet.address}
								provider={wallet.provider}
								name={wallet.name}
								address={wallet._address}
								onClick={onOpen}
							/>
						);
					})}

					<Modal isOpen={isOpen} onClose={_onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Manage your wallet</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								{/* Name */}
								<FormControl id="name">
									<FormLabel>Name</FormLabel>
									<Input type="name" placeholder={''} />
								</FormControl>

								{/* Description */}
								<FormControl id="description" mt={4}>
									<FormLabel>Description</FormLabel>
									<Input
										type="description"
										placeholder={''}
									/>
								</FormControl>
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme="blue"
									mr={3}
									onClick={updateWallet}
								>
									Update
								</Button>
								<Button
									colorScheme="red"
									onClick={deleteWallet}
								>
									Delete
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
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
							{/* <MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem> */}
							{/* <MenuDivider /> */}
							<MenuItem onClick={logOut}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
