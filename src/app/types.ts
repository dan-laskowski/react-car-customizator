export interface Model {
  id: number;
  name: string;
  engines: Engine[];
}

export interface Engine {
  capacity: string;
  gearboxes: Gearbox[];
  price: number;
}

export interface Gearbox {
  name: GearboxType;
  price: number;
}

export interface Color {
  id: number;
  name: string;
  value: string;
  price: number;
}

export interface ConfigState {
  value: CarConfig;
}

export interface CarConfig {
  model: string;
  engine: EngineConfig;
  gearbox: GearboxConfig;
  color: ColorConfig;
}

export interface EngineConfig {
  name: string;
  price: number;
}

export interface GearboxConfig {
  name: GearboxType | '';
  price: number;
}

export type GearboxType = 'manual' | 'automatic';

export type ColorConfig = Omit<Color, 'id'>;
