import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import stateInputReducer from './stateInputSlice'

const logger = createLogger()

export default configureStore({
    reducer: {
        stateInput: stateInputReducer
    },
    // parakh: uncomment the line below to enable state logger
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})