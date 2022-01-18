import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, RadioGroup } from '@headlessui/react';
import { getColors, getModels } from '../app/api';
import {
  changeModel,
  changeEngineName,
  changeEnginePrice,
  changeGearboxName,
  changeGearboxPrice,
  changeColorName,
  changeColorValue,
  changeColorPrice,
} from '../features/config/configSlice';

export default function Form() {
  const dispatch = useDispatch();

  let [isLoading, setLoading] = useState(true);

  let [models, setModels] = useState([]);
  let [colors, setColors] = useState([]);
  let [currentModelTab, setCurrentModelTab] = useState(0);
  let [currentEngineTab, setCurrentEngineTab] = useState(0);

  const handleModelTabChange = (index) => {
    setCurrentModelTab(index);
    dispatch(changeModel(models[index].name));

    dispatch(changeEngineName(models[index].engines[0].capacity));
    dispatch(changeEnginePrice(models[index].engines[0].price));

    dispatch(changeGearboxName(models[index].engines[0].gearboxes[0].name));
    dispatch(changeGearboxPrice(models[index].engines[0].gearboxes[0].price));
  };

  const handleEngineTabChange = (index) => {
    setCurrentEngineTab(index);
    dispatch(
      changeEngineName(
        models[currentModelTab].engines[currentEngineTab].capacity
      )
    );
    dispatch(
      changeEnginePrice(models[currentModelTab].engines[currentEngineTab].price)
    );

    dispatch(
      changeGearboxName(
        models[currentModelTab].engines[index].gearboxes[0].name
      )
    );
    dispatch(
      changeGearboxPrice(
        models[currentModelTab].engines[index].gearboxes[0].price
      )
    );
  };

  const handleGearboxTabChange = (index) => {
    dispatch(
      changeGearboxName(
        models[currentModelTab].engines[currentEngineTab].gearboxes[index].name
      )
    );
    dispatch(
      changeGearboxPrice(
        models[currentModelTab].engines[currentEngineTab].gearboxes[index].price
      )
    );
  };

  const handleColorChange = (index) => {
    dispatch(changeColorName(colors[index].name));
    dispatch(changeColorValue(colors[index].value));
    dispatch(changeColorPrice(colors[index].price));
  };

  useEffect(() => {
    getModels().then((models) => {
      setModels(models);
      dispatch(changeModel(models[0].name));
      dispatch(changeEngineName(models[0].engines[0].capacity));
      dispatch(changeEnginePrice(models[0].engines[0].price));
      dispatch(changeGearboxName(models[0].engines[0].gearboxes[0].name));
      dispatch(changeGearboxPrice(models[0].engines[0].gearboxes[0].price));
    });
    getColors().then((colors) => {
      setColors(colors);
      dispatch(changeColorName(colors[0].name));
      dispatch(changeColorValue(colors[0].value));
      dispatch(changeColorPrice(colors[0].price));
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
                          <Tab.Group
                            onChange={(index) => handleGearboxTabChange(index)}
                          >
                            <Tab.List>
                              {engine.gearboxes.map((gearbox) => (
                                <Tab key={gearbox.name}>
                                  {({ selected }) => (
                                    <button
                                      className={`border p-4 mx-2 text-white ${
                                        selected
                                          ? 'bg-neutral-600'
                                          : 'bg-neutral-400'
                                      } rounded-lg cursor-pointer`}
                                    >
                                      {gearbox.name}
                                    </button>
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
            <h1>Avaiable Colors:</h1>
            <Tab.Group onChange={(index) => handleColorChange(index)}>
              <Tab.List>
                {colors.map((color) => (
                  <Tab key={color.name}>
                    {({ selected }) => (
                      <button
                        style={{ backgroundColor: color.value }}
                        className={`border border-black p-4 mx-2 text-white ${
                          selected ? 'border-4' : 'border-0'
                        } rounded-lg cursor-pointer`}
                      >
                        {color.name}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
            {/* <RadioGroup
              className="flex flex-row"
              value={value.color.name}
              onChange={(value) => dispatch(changeColorName(value))}
            >
              {colors.map((color) => (
                <RadioGroup.Option key={color.id} value={color.name}>
                  {({ checked }) => (
                    <button
                      style={{ backgroundColor: color.value }}
                      className={`border border-black p-4 mx-2 text-white ${
                        checked ? 'border-4' : 'border-0'
                      } rounded-lg cursor-pointer`}
                    >
                      {color.name}
                    </button>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup> */}
          </div>
        </>
      )}
    </>
  );
}
