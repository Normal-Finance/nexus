import React from 'react';
import {
	InputGroup,
	InputLeftElement,
	Input,
	TableContainer,
	Thead,
	Tr,
	Th,
	Table,
	Avatar,
	Tbody,
	Text,
	Td,
	Card,
	CardBody,
	Button,
	CardHeader,
	Heading,
	Code,
	Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import config from '../../build/contracts/Nexus.json';
import { useContractRead } from 'wagmi';
import { CopyIcon } from '@chakra-ui/icons';
import sha256 from 'crypto-js/sha256';

const Search = ({ value, handleChange }) => {
	// Smart Contract
	const {
		data: wallets,
		isError,
		isLoading,
	} = useContractRead({
		address: config.address,
		abi: config.abi,
		functionName: 'getWallets',
		args: ['0x' + sha256(value).toString()],
	});
	console.log(sha256(value).toString());

	const sendInvite = () => {};

	const sendEmail = () => {
		window.location.href =
			'mailto:jblewdv@gmail.com?subject=Checkout%20Nexus&body=Hey%20here';
	};

	return (
		<>
			{/* Search Form */}
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon />}
				/>
				<Input
					type="tel"
					placeholder="Search people by phone number"
					value={value}
					onChange={(event) => {
						handleChange(event.target.value);
					}}
				/>
			</InputGroup>

			{/* Results */}
			{value !== '' && !isError && !isLoading && wallets && (
				<Card
					variant={'elevated'}
					style={{ marginTop: '2rem', backgroundColor: 'white' }}
				>
					<CardHeader>
						<Heading size="md">Results ({wallets.length})</Heading>
					</CardHeader>
					<Divider />
					<CardBody>
						{wallets.length > 0 ? (
							<TableContainer>
								<Table variant="simple">
									<Thead>
										<Tr>
											<Th>Provider</Th>
											<Th>Chain</Th>
											<Th>Name</Th>
											<Th>Description</Th>
											<Th>Address</Th>
										</Tr>
									</Thead>
									<Tbody>
										{wallets.map((wallet) => {
											return (
												<Tr>
													<Td>
														<Avatar
															size="sm"
															mr="4"
															// fontSize="16"
															// _groupHover={{
															// 	color: 'white',
															// }}
															name={
																wallet.provider
															}
															src={`/walletProviders/${wallet.provider}.png`}
														/>
														{wallet.provider}
													</Td>
													<Td>{wallet.chain}</Td>
													<Td>{wallet.name}</Td>
													<Td>
														{wallet.description}
													</Td>
													<Td>
														<Code>
															{wallet._address}
														</Code>{' '}
														<CopyIcon
															onClick={() => {
																navigator.clipboard.writeText(
																	wallet._address
																);
																alert(
																	'Wallet address copied!'
																);
															}}
														/>
													</Td>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</TableContainer>
						) : (
							<>
								<Text mb={3}>
									There are no wallets associated with this
									phone number.
								</Text>
								<Button
									mr={3}
									colorScheme="blue"
									onClick={sendInvite}
								>
									Invite via SMS
								</Button>
								<Button colorScheme="teal" onClick={sendEmail}>
									Invite via Email
								</Button>
							</>
						)}
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default Search;
