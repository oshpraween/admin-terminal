import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  customers: string[];
  selectedCustomer: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<string>) {
      state.customers.push(action.payload);
    },
    removeCustomer(state, action: PayloadAction<string>) {
      state.customers = state.customers.filter(
        (customer) => customer !== action.payload
      );
    },
    selectCustomer(state, action: PayloadAction<string>) {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { addCustomer, removeCustomer, selectCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
