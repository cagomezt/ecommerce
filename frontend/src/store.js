/**
 * This file sets up and exports a Redux store using Redux Toolkit's `configureStore` method.
 *
 * The store is configured with:
 * - An empty `reducer` object: This is where you can add your slice reducers.
 * - An empty `preloadedState` object: This can be used to initialize the store with a predefined state.
 *
 * Redux Toolkit automatically includes middleware like Redux Thunk by default,
 * so no additional middleware configuration is necessary unless custom middleware is required.
 */

import { configureStore } from '@reduxjs/toolkit'

/**
 * Creates and configures the Redux store.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore} The configured Redux store.
 */
const store = configureStore({
    reducer: {}, // Add your slice reducers here
    preloadedState: {}, // Optionally provide an initial state
})

export default store