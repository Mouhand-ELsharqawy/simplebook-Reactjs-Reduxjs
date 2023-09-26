import { configureStore } from "@reduxjs/toolkit";
import books from './bookslice';
export default configureStore({
    reducer:{
        books,
    }
})