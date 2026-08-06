import { useState, useEffect, JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Tab } from '@headlessui/react';
import { getColors, getModels } from '../app/api';
import {
  changeModel,
  changeGearbox,
  changeEngine,
  changeColor,
} from '../features/config/configSlice';
import Option from './Option';
import OptionLabel from './OptionLabel';
import ColorSwatch from './ColorSwatch';
import { Color, Model } from '../app/types';

export default function Form(): JSX.Element {
  const { value } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  let [isLoading, setLoading] = useState(true);

  let [models, setModels] = useState<Model[]>([]);
  let [colors, setColors] = useState<Color[]>([]);
  let [currentModelTab, setCurrentModelTab] = useState(0);
  let [currentEngineTab, setCurrentEngineTab] = useState(0);

  const handleModelTabChange = (index: number): void => {
    const engine = models[index].engines[0];
    dispatch(changeEngine({ name: engine.capacity, price: engine.price }));
    dispatch(
      changeGearbox({
        name: engine.gearboxes[0].name,
        price: engine.gearboxes[0].price,
      }),
    );

    setCurrentModelTab(index);
    dispatch(changeModel(models[index].name));
  };

  const handleEngineTabChange = (index: number): void => {
    const engine = models[currentModelTab].engines[index];
    dispatch(changeEngine({ name: engine.capacity, price: engine.price }));
    dispatch(
      changeGearbox({
        name: engine.gearboxes[0].name,
        price: engine.gearboxes[0].price,
      }),
    );
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

  useEffect(() => {
    getModels().then((models) => {
      setModels(models);
      const model = models[0];
      dispatch(changeModel(model.name));
      dispatch(
        changeEngine({
          name: model.engines[0].capacity,
          price: model.engines[0].price,
        }),
      );
      dispatch(
        changeGearbox({
          name: model.engines[0].gearboxes[0].name,
          price: model.engines[0].gearboxes[0].price,
        }),
      );
    });
    getColors().then((colors) => {
      setColors(colors);
      const color = colors[0];
      dispatch(
        changeColor({
          name: color.name,
          value: color.value,
          price: color.price,
        }),
      );
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <main>
      {isLoading ? (
        <h1>Ładowanie elementów</h1>
      ) : (
        <div>
          <OptionLabel>Model</OptionLabel>
          <Tab.Group onChange={(index) => handleModelTabChange(index)}>
            <Tab.List className="mb-6">
              {models.map((item) => (
                <Tab key={item.id}>
                  {({ selected }) => (
                    <Option selected={selected}>{item.name}</Option>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <OptionLabel>Engine</OptionLabel>
              {models.map((item) => (
                <Tab.Panel className="w-full flex flex-col" key={item.id}>
                  <Tab.Group onChange={(index) => handleEngineTabChange(index)}>
                    <Tab.List className="mb-6">
                      {item.engines.map((engine) => (
                        <Tab key={engine.capacity}>
                          {({ selected }) => (
                            <Option selected={selected}>
                              {engine.capacity}
                            </Option>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels>
                      {item.engines.map((engine) => (
                        <Tab.Panel key={engine.capacity}>
                          <OptionLabel>Engine</OptionLabel>
                          <Tab.Group
                            onChange={(index) => handleGearboxTabChange(index)}
                          >
                            <Tab.List className="mb-12">
                              {engine.gearboxes.map((gearbox) => (
                                <Tab key={gearbox.name}>
                                  {({ selected }) => (
                                    <Option selected={selected}>
                                      {gearbox.name}
                                    </Option>
                                  )}
                                </Tab>
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
            <Tab.Group onChange={(index) => handleColorChange(index)}>
              <Tab.List className="flex align-center">
                {colors.map((color) => (
                  <Tab key={color.name}>
                    {({ selected }) => (
                      <ColorSwatch color={color.value} selected={selected} />
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      )}
    </main>
  );
}
