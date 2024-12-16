import { configureStore,  combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice/AuthSlice.js";
import RefreshSlice from "./RealTimeUpdate/RefreshSlice.js";
import CartSlice from "./Cart/CartSlice.js";
import storage from "redux-persist/lib/storage";

import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import storage from "redux-persist/lib/storage";
// import localStorage from "redux-persist/es/storage";
// import { } from "@reduxjs/toolkit";

let rootConfig={
    storage:AsyncStorage,
    key:'root'
    
    
};

let rootReducer=combineReducers( {
    Auth:AuthSlice,
    refresh:RefreshSlice,
    MyCart:CartSlice
});

let persistedReducer=persistReducer(rootConfig,rootReducer);

const Store=configureStore({
    reducer: persistedReducer
})




export default Store;


