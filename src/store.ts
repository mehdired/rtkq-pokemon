import { configureStore } from '@reduxjs/toolkit'
import { jsonApi } from './api/api'

export const store = configureStore({
	reducer: {
		[jsonApi.reducerPath]: jsonApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(jsonApi.middleware)
})
