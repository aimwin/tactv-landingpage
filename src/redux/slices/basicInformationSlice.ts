import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  formData: {
    searchData: null, // Store search data here
    // Other form data fields
  },
};

const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState,
  reducers: {
    setCurrentPage: (state: any, action: PayloadAction<number>) => {
      console.log("Setting currentPage:", action.payload);
      state.currentPage = action.payload;
    },
    updateFormData: (state: any, action: PayloadAction<Record<string, any>>) => {
      console.log("Updating formData with:", action.payload);
      state.formData = {
        ...state.formData,
        ...action.payload,
      };

      // Update searchData inside formData
      if (action.payload.setSearchData) {
        state.formData.searchData = action.payload.setSearchData;
      }
    },
    resetFormData: (state : any) => {
      state.formData = {}
    }
  },
});

export const { setCurrentPage, updateFormData, resetFormData } = basicInformationSlice.actions;

export default basicInformationSlice.reducer;
