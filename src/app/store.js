import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';

export default configureStore({
  reducer: {
    crypto: cryptoReducer
  }
});