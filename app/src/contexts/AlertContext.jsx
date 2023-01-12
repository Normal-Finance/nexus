// Modules
import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
	const alertSuccess = (message) => toast.success(message);
	const alertError = (message) => toast.error(message);
	const alertWarn = (message) => toast.warn(message);
	const alertInfo = (message) => toast.info(message);

	return (
		<AlertContext.Provider
			value={{
				alertSuccess,
				alertError,
				alertWarn,
				alertInfo,
			}}
		>
			{children}
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	return useContext(AlertContext);
};
