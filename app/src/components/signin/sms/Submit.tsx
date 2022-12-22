import React from 'react';
import {
	Button,
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react';
import { FcPhone } from 'react-icons/fc';
import { Field, Form, Formik } from 'formik';

const Submit = ({ phoneNumber, handleChange, onSubmit }: any) => {
	function validateField(value: any) {
		let error;
		if (!value) {
			error = 'Phone number is required';
		}
		return error;
	}

	return (
		<Formik
			initialValues={{
				phoneNumber: '',
			}}
			onSubmit={async (values, actions) => {
				onSubmit(phoneNumber);
				console.log(values);
				actions.setSubmitting(false);
			}}
		>
			{(props) => (
				<Form>
					<div id="recaptcha-container"></div>
					<Stack spacing={4}>
						{/* Phone Number */}
						<Field name="phoneNumber" validate={validateField}>
							{({ field, form }: any) => (
								<FormControl
									isInvalid={
										form.errors.phoneNumber &&
										form.touched.phoneNumber
									}
									isRequired
								>
									<FormLabel>Phone Number</FormLabel>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={
												<FcPhone color="gray.300" />
											}
										/>
										<Input
											placeholder="Phone number"
											value={phoneNumber}
											onChange={handleChange}
											{...field}
										/>
									</InputGroup>
									<FormErrorMessage>
										{form.errors.phoneNumber}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
					</Stack>
					<Button
						mt={4}
						loadingText="Submitting"
						isLoading={props.isSubmitting}
						type="submit"
						variant={'outline'}
						// disabled={}
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default Submit;
