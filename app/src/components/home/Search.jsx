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
	Td,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Code,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import config from '../../build/contracts/Nexus.json';
import { useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { CopyIcon } from '@chakra-ui/icons';

const Search = ({ value, handleChange }) => {
	const { data, isError, isLoading } = useContractRead({
		address: config.address,
		abi: config.abi,
		functionName: 'getWallets',
		args: [ethers.utils.formatBytes32String(value)],
	});

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
			{value !== '' && !isError && !isLoading && data && (
				<Card variant={'elevated'} style={{ marginTop: '2rem' }}>
					<CardHeader>
						<Heading size="md">Results ({data.length})</Heading>
					</CardHeader>
					<CardBody>
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
									{data.map((wallet) => {
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
														name={wallet.provider}
														src={`/walletProviders/${wallet.provider}.png`}
													/>
													{wallet.provider}
												</Td>
												<Td>{wallet.chain}</Td>
												<Td>{wallet.name}</Td>
												<Td>{wallet.description}</Td>
												<Td>
													<Code colorScheme="blue">
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
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default Search;
