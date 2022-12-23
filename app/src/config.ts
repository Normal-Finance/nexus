export const auth0Config = {
	domain: process.env.REACT_APP_AUTH0_DOMAIN,
	clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
};

export const nexusConfig = {
	share: { url: 'http://nexus.normalfinance.io', title: 'Nexus by Normal' },
};

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
