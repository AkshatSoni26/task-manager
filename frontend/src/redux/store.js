import { configureStore } from '@reduxjs/toolkit';
import todoreducer from './todoreducer';


const store = configureStore({
    reducer : {
        todo: todoreducer,
    }
});

export default store;
