import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    currentPage : 1,
    formData : {
        searchData : null
    }
}

const ftaRegisterSlice = createSlice({
    name : "plcInformation",
    initialState,
    reducers : {
        setCurrentPage: (state : any, action : PayloadAction<number> ) => {
    console.log('Setting currentPage:', action.payload);
    state.currentPage = action.payload;
    },
    updateFormData: (state : any, action : PayloadAction<Record<string,any>>) => {
    console.log('Updating formData with:', action.payload);
    state.formData = {
        ...state.formData,
        ...action.payload,
    };
    
    if(action.payload.setSearchData){
        state.formData.searchData = action.payload.setSearchData
    }
    },
    resetFormData: (state : any) => {
        state.formData = {}
    }
    },
})

export const {
    setCurrentPage,
    updateFormData,
    resetFormData
} = ftaRegisterSlice.actions;

export default ftaRegisterSlice.reducer;