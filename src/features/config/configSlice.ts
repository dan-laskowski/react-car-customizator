import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ColorConfig,
  ConfigState,
  EngineConfig,
  GearboxConfig,
} from '../../app/types';

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
    changeEngine(state, action: PayloadAction<EngineConfig>) {
      state.value.engine = action.payload;
    },
    changeGearbox(state, action: PayloadAction<GearboxConfig>) {
      state.value.gearbox = action.payload;
    },
    changeColor(state, action: PayloadAction<ColorConfig>) {
      state.value.color = action.payload;
    },
  },
});

export const { changeModel, changeGearbox, changeEngine, changeColor } =
  configSlice.actions;

export default configSlice.reducer;
