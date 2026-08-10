import { useState, JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Tab } from '@headlessui/react';
import {
  changeModel,
  changeGearbox,
  changeColor,
} from '../features/config/configSlice';
import OptionLabel from './OptionLabel';
import ColorSwatch from './ColorSwatch';
import { Color, Model } from '../app/types';
import OptionTab from './OptionTab';
import { useSelectEngine } from '../features/config/useSelectEngine';

interface FormProps {
  models: Model[];
  colors: Color[];
}

export default function Form({ models, colors }: FormProps): JSX.Element {
  const { value } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [currentModelTab, setCurrentModelTab] = useState(0);
  const [currentEngineTab, setCurrentEngineTab] = useState(0);

  const selectEngine = useSelectEngine();

  const handleModelTabChange = (index: number): void => {
    const engine = models[index].engines[0];
    selectEngine(engine);

    setCurrentModelTab(index);
    dispatch(changeModel(models[index].name));
    setCurrentEngineTab(0);
  };

  const handleEngineTabChange = (index: number): void => {
    const engine = models[currentModelTab].engines[index];
    selectEngine(engine);
    setCurrentEngineTab(index);
  };

  const handleGearboxTabChange = (index: number): void => {
    const gearbox =
      models[currentModelTab].engines[currentEngineTab].gearboxes[index];
    dispatch(changeGearbox({ name: gearbox.name, price: gearbox.price }));
  };

  const handleColorChange = (index: number): void => {
    const color = colors[index];
    dispatch(
      changeColor({ name: color.name, value: color.value, price: color.price }),
    );
  };

  return (
    <div>
      <div>
        <OptionLabel>Model</OptionLabel>
        <Tab.Group onChange={handleModelTabChange}>
          <Tab.List className="mb-6">
            {models.map((item) => (
              <OptionTab key={item.id} label={item.name} />
            ))}
          </Tab.List>
          <Tab.Panels>
            <OptionLabel>Engine</OptionLabel>
            {models.map((item) => (
              <Tab.Panel className="w-full flex flex-col" key={item.id}>
                <Tab.Group onChange={handleEngineTabChange}>
                  <Tab.List className="mb-6">
                    {item.engines.map((engine) => (
                      <OptionTab
                        key={engine.capacity}
                        label={engine.capacity}
                      />
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {item.engines.map((engine) => (
                      <Tab.Panel key={engine.capacity}>
                        <OptionLabel>Gearbox</OptionLabel>
                        <Tab.Group onChange={handleGearboxTabChange}>
                          <Tab.List className="mb-12">
                            {engine.gearboxes.map((gearbox) => (
                              <OptionTab
                                key={gearbox.name}
                                label={gearbox.name}
                              />
                            ))}
                          </Tab.List>
                        </Tab.Group>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div>
          <h1 className="text-lg dark:text-neutral-300 font-bold">Paint</h1>
          <p className="text-sm dark:text-neutral-400 mb-4">
            {value.color.name}
          </p>
          <Tab.Group onChange={handleColorChange}>
            <Tab.List className="flex align-center">
              {colors.map((color) => (
                <Tab key={color.name} aria-label={color.name}>
                  {({ selected }) => (
                    <ColorSwatch color={color.value} selected={selected} />
                  )}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
