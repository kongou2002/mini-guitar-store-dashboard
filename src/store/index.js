import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import staffReducer from './slice/staffSlice';
import notificationReducer from './slice/notificationSlice';
import memberReducer from './slice/memberSlice';
import candidateReducer from './slice/candidateSlice';
import reportReducer from './slice/reportSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  staff: staffReducer,
  notification: notificationReducer,
  members: memberReducer,
  candidates: candidateReducer,
  report: reportReducer,
});

const persistConfig = {
  key: 'dashboard-root',
  storage,
  blacklist: ['notification'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
