import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
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
import Option from './Option';
import OptionLabel from './/OptionLabel';
import ColorSwatch from './ColorSwatch';

export default function Form() {
  const { value } = useSelector((state) => state.config);
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
    dispatch(changeEngineName(models[currentModelTab].engines[index].capacity));
    dispatch(changeEnginePrice(models[currentModelTab].engines[index].price));

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
            <h1 className="text-lg font-bold">Paint</h1>
            <p className="text-sm mb-4">{value.color.name}</p>
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
