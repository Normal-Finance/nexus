// Modules
import { Avatar, Flex, FlexProps, Link, Text } from '@chakra-ui/react';

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

export default NavItem;
