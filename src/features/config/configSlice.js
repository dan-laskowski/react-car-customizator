import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    value: {
      model: '',
      engine: '',
      gearbox: '',
    },
  },
  reducers: {
    changeModel(state, action) {
      state.value.model = action.payload;
    },
    changeEngine(state, action) {
      state.value.engine = action.payload;
    },
    changeGearbox(state, action) {
      state.value.gearbox = action.payload;
    },
  },
});

export const { changeModel, changeEngine, changeGearbox } = configSlice.actions;

export default configSlice.reducer;
