console.log(import.meta.env);
export const urlPrefix = import.meta.env.DEV
	? import.meta.env.VITE_REACT_APP_BACKEND_TEST_URL
	: import.meta.env.VITE_REACT_APP_BACKEND_PROD_URL;
