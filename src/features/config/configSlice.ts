import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, GearboxType } from '../../app/types';

const initialState: ConfigState = {
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
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeModel(state, action: PayloadAction<string>) {
      state.value.model = action.payload;
    },

    changeEngineName(state, action: PayloadAction<string>) {
      state.value.engine.name = action.payload;
    },
    changeEnginePrice(state, action: PayloadAction<number>) {
      state.value.engine.price = action.payload;
    },

    changeGearboxName(state, action: PayloadAction<GearboxType>) {
      state.value.gearbox.name = action.payload;
    },
    changeGearboxPrice(state, action: PayloadAction<number>) {
      state.value.gearbox.price = action.payload;
    },

    changeColorName(state, action: PayloadAction<string>) {
      state.value.color.name = action.payload;
    },
    changeColorValue(state, action: PayloadAction<string>) {
      state.value.color.value = action.payload;
    },
    changeColorPrice(state, action: PayloadAction<number>) {
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
} = configSlice.actions;

export default configSlice.reducer;
