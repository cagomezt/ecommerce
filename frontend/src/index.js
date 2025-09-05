/**
 * This file is the entry point for the React application.
 * It sets up the React application with a Redux store and renders the root component.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'; // Provides the Redux store to the React application
import store from './store'; // The configured Redux store
import './index.css'; // Global CSS styles
import './bootstrap.min.css'; // Bootstrap CSS for styling
import App from './App'; // The root React component
import reportWebVitals from './reportWebVitals';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev"; // Utility for measuring app performance

// Create a root DOM node for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renders the React application wrapped with the Redux Provider.
 * The Provider makes the Redux store available to all components in the app.
 */
root.render(
    <Provider store={store}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </Provider>
);

/**
 * Starts measuring performance in the app.
 * Pass a function to log results (e.g., `reportWebVitals(console.log)`)
 * or send them to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();