import { configureStore } from '@reduxjs/toolkit'
import formSliceReducer from './slices/formSlice'
export default configureStore({
  reducer: {
    form : formSliceReducer
  },
})