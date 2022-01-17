import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, RadioGroup } from '@headlessui/react';
import { getModels } from '../app/api';
import {
  changeEngine,
  changeModel,
  changeGearbox,
} from '../features/config/configSlice';

export default function Form() {
  const { value } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  let [isLoading, setLoading] = useState(true);

  let [models, setModels] = useState([]);
  let [currentModelTab, setCurrentModelTab] = useState(0);

  const handleModelTabChange = (index) => {
    setCurrentModelTab(index);
    dispatch(changeModel(models[index].name));
    dispatch(changeEngine(models[index].engines[0].capacity));
    dispatch(changeGearbox(models[index].engines[0].gearboxes[0].name));
  };

  const handleEngineTabChange = (index) => {
    dispatch(changeEngine(models[currentModelTab].engines[index].capacity));
    dispatch(
      changeGearbox(models[currentModelTab].engines[index].gearboxes[0].name)
    );
  };

  useEffect(() => {
    getModels().then((models) => {
      setModels(models);
      dispatch(changeModel(models[0].name));
      dispatch(changeEngine(models[0].engines[0].capacity));
      dispatch(changeGearbox(models[0].engines[0].gearboxes[0].name));
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Ładowanie elementów</h1>
      ) : (
        <>
          <h1>MODEL</h1>
          <Tab.Group onChange={(index) => handleModelTabChange(index)}>
            <Tab.List>
              {models.map((item) => (
                <Tab key={item.id}>
                  {({ selected }) => (
                    <button
                      className={`border p-4 mx-2 text-white ${
                        selected ? 'bg-neutral-600' : 'bg-neutral-400'
                      } rounded-lg cursor-pointer`}
                    >
                      {item.name}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <p>ENGINE</p>
              {models.map((item) => (
                <Tab.Panel className="w-full flex flex-col" key={item.id}>
                  <Tab.Group onChange={(index) => handleEngineTabChange(index)}>
                    <Tab.List>
                      {item.engines.map((engine) => (
                        <Tab key={engine.capacity}>
                          {({ selected }) => (
                            <button
                              className={`border p-4 mx-2 text-white ${
                                selected ? 'bg-neutral-600' : 'bg-neutral-400'
                              } rounded-lg cursor-pointer`}
                            >
                              {engine.capacity}
                            </button>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels>
                      {item.engines.map((engine) => (
                        <Tab.Panel key={engine.capacity}>
                          <p>GEARBOX</p>
                          <RadioGroup
                            className="flex flex-row"
                            value={value.gearbox}
                            onChange={(value) => dispatch(changeGearbox(value))}
                          >
                            {engine.gearboxes.map((gearbox) => (
                              <RadioGroup.Option
                                key={gearbox.name}
                                value={gearbox.name}
                              >
                                {({ checked }) => (
                                  <button
                                    className={`border p-4 mx-2 text-white ${
                                      checked
                                        ? 'bg-neutral-600'
                                        : 'bg-neutral-400'
                                    } rounded-lg cursor-pointer`}
                                  >
                                    {gearbox.name}
                                  </button>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </RadioGroup>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
    </>
  );
}
