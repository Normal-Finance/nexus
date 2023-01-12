import { Box, Stack, Text, Button, useColorModeValue } from '@chakra-ui/react';

const Error = ({ message }) => {
	return (
		<Box
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			boxShadow={'lg'}
			p={8}
		>
			<Stack spacing={4}>
				<Stack align={'center'}>
					<Text fontSize={'lg'} color={'gray.600'}>
						{message}
					</Text>
					<Button
						colorScheme="red"
						onClick={() => window.location.reload()}
					>
						Verify
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Error;
