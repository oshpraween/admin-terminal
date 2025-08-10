import { createSlice } from '@reduxjs/toolkit';

interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    onStartLoading(state) {
      state.loading = true;
    },
    onStopLoading(state) {
      state.loading = false;
    },
  },
});

export const { onStartLoading, onStopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
