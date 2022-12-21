import { useContext, createContext, useEffect, useState } from 'react';
import {
	RecaptchaVerifier,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signInWithPhoneNumber,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
		// signInWithRedirect(auth, provider);
	};

	const setupReCaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response) => {
					console.log(response);
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					// sendSMSVerificationCode(phoneNumber);
				},
			},
			auth
		);
	};

	const sendSMSVerificationCode = (phoneNumber) => {
		setupReCaptcha();

		const appVerifier = window.recaptchaVerifier;
		console.log(appVerifier);
		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				console.log(confirmationResult);
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch((error) => {
				console.log(error);
				// Error; SMS not sent
				// ...
				// window.recaptchaVerifier.render().then(function (widgetId) {
				// 	grecaptcha.reset(widgetId);
				// });
			});
	};

	const submitSMSVerificationCode = (code) => {
		window.confirmationResult
			.confirm(code)
			.then((result) => {
				console.log(result);
				// User signed in successfully.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				console.log(error);
				// User couldn't sign in (bad verification code?)
				// ...
			});
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log('User', currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				googleSignIn,
				setupReCaptcha,
				sendSMSVerificationCode,
				submitSMSVerificationCode,
				logOut,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
