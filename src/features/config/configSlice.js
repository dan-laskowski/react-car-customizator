import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    value: {
      model: '',
      engine: {
        name: '',
        price: 0,
      },
      gearbox: {
        name: '',
        price: 0,
      },
      color: {
        name: '',
        value: '',
        price: 0,
      },
      price: 0,
    },
  },
  reducers: {
    changeModel(state, action) {
      state.value.model = action.payload;
    },

    changeEngineName(state, action) {
      state.value.engine.name = action.payload;
    },
    changeEnginePrice(state, action) {
      state.value.engine.price = action.payload;
    },

    changeGearboxName(state, action) {
      state.value.gearbox.name = action.payload;
    },
    changeGearboxPrice(state, action) {
      state.value.gearbox.price = action.payload;
    },

    changeColorName(state, action) {
      state.value.color.name = action.payload;
    },
    changeColorValue(state, action) {
      state.value.color.value = action.payload;
    },
    changeColorPrice(state, action) {
      state.value.color.price = action.payload;
    },
  },
});

export const {
  changeModel,
  changeEngineName,
  changeEnginePrice,
  changeGearboxName,
  changeGearboxPrice,
  changeColorName,
  changeColorValue,
  changeColorPrice,
  refreshPrice,
} = configSlice.actions;

export default configSlice.reducer;
