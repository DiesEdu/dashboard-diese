import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import App from "./App";
import {AuthContextProvider} from "./views/auth/AuthContext";

ReactDOM.render(
	<AuthContextProvider>
		<App />
	</AuthContextProvider>,
	document.getElementById('root')
);
