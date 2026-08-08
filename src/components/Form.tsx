import { useState, useEffect, JSX, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Tab } from '@headlessui/react';
import { getColors, getModels } from '../app/api';
import {
  changeModel,
  changeGearbox,
  changeEngine,
  changeColor,
} from '../features/config/configSlice';
import OptionLabel from './OptionLabel';
import ColorSwatch from './ColorSwatch';
import { Color, Engine, Model } from '../app/types';
import OptionTab from './OptionTab';

export default function Form(): JSX.Element {
  const { value } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  const [currentModelTab, setCurrentModelTab] = useState(0);
  const [currentEngineTab, setCurrentEngineTab] = useState(0);

  const selectEngine = useCallback(
    (engine: Engine): void => {
      dispatch(changeEngine({ name: engine.capacity, price: engine.price }));
      dispatch(
        changeGearbox({
          name: engine.gearboxes[0].name,
          price: engine.gearboxes[0].price,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    async function loadData() {
      try {
        const [models, colors] = await Promise.all([getModels(), getColors()]);
        setModels(models);
        setColors(colors);

        const model = models[0];
        dispatch(changeModel(model.name));
        selectEngine(model.engines[0]);

        const color = colors[0];
        dispatch(
          changeColor({
            name: color.name,
            value: color.value,
            price: color.price,
          }),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dispatch, selectEngine]);

  const handleModelTabChange = (index: number): void => {
    const engine = models[index].engines[0];
    selectEngine(engine);

    setCurrentModelTab(index);
    dispatch(changeModel(models[index].name));
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
    <main>
      {error ? (
        <h1>Something went wrong: {error}</h1>
      ) : isLoading ? (
        <h1>Fetching available configurations....</h1>
      ) : (
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
                          <OptionLabel>Engine</OptionLabel>
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
