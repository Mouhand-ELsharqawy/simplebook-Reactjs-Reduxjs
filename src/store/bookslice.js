import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// const getBooks = createAsyncThunk('book/getBooks',async (args,thunkAPI)=>{});
export const getBooks = createAsyncThunk(
    'book/getBooks', 
    async(_,thunkAPI)=>{
        const { rejectWithValue } = thunkAPI;
    try{
        const res = await fetch("http://localhost:3005/books");
        const data = await res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

export const insertbook = createAsyncThunk('book/insertBook',async(bookdata,thunkAPI)=>{
    try{
        const { rejectWithValue } = thunkAPI;
        const res = fetch("http://localhost:3005/books",{
            method:'POST',
            body: JSON.stringify(bookdata),
            headers:{
                'Content-type':'application/json; charset = UTF-8'
            }
        })

        const data = await res.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
} )
export const deletebook = createAsyncThunk('book/deleteBook',async(id,thunkAPI)=>{
    try{
        const { rejectWithValue } = thunkAPI;
        const res = fetch("http://localhost:3005/books/"+id,{
            method:'DELETE',
            // headers:{
            //     'Content-type':'application/json; charset = UTF-8'
            // }
        })
        return id;
    }catch(error){
        return rejectWithValue(error.message)
    }
})

const bookSlice = createSlice({
    name:"book",
    initialState:{books: [],isLoading: false,error: null},
    extraReducers:{
        // get books 
        [getBooks.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [getBooks.fulfilled]:(state,action)=>{
            state.books = action.payload;
            state.isLoading = false;
            console.log(state.books)
        },
        [getBooks.rejected]:(state,action)=>{
            state.isLoading = false
            state.error = action.payload;
        },
        // insert books 
        [insertbook.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [insertbook.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.books.push(action.payload)
        },
        [insertbook.rejected]:(state,action)=>{
            state.isLoading = false
            state.error = action.payload;
        },
        [deletebook.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [deletebook.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.books = state.books.filter(el => el.id !== action.payload);
            console.log(action)
        },
        [deletebook.rejected]:(state,action)=>{
            state.isLoading = false
            state.error = action.payload;
        }
    }
});

export default bookSlice.reducer;