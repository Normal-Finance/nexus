// Modules
import {
	Box,
	chakra,
	Container,
	Stack,
	Image,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ReactNode } from 'react';
import SocialShare from './SocialShare';
import Donate from './Donate';

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				spacing={4}
				justify={'center'}
				align={'center'}
			>
				<Image
					width={'10%'}
					objectFit="cover"
					src="/logo.png"
					alt="Normal Logo"
				/>
				<Stack direction={'row'} spacing={6}>
					<SocialShare />
					{/* <Donate /> */}
					{/* <Link href={'#'}>Home</Link>
			<Link href={'#'}>About</Link>
			<Link href={'#'}>Blog</Link>
			<Link href={'#'}>Contact</Link> */}
				</Stack>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'6xl'}
					py={4}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ base: 'center', md: 'space-between' }}
					align={{ base: 'center', md: 'center' }}
				>
					<Text>© 2022 Chakra Templates. All rights reserved</Text>
					<Stack direction={'row'} spacing={6}>
						<SocialButton
							label={'Twitter'}
							href={'https://twitter.com/normalfi'}
						>
							<FaTwitter />
						</SocialButton>
						<SocialButton
							label={'LinkedIn'}
							href={'https://www.linkedin.com/company/normalfi'}
						>
							<FaLinkedin />
						</SocialButton>
						<SocialButton
							label={'Instagram'}
							href={'https://www.instagram.com/normalfinance.io/'}
						>
							<FaInstagram />
						</SocialButton>
						<SocialButton
							label={'Discord'}
							href={'https://link.normalfinance.io/discord'}
						>
							<FaDiscord />
						</SocialButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
