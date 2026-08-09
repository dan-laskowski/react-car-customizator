import { useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changeEngine, changeGearbox } from './configSlice';
import { Engine } from '../../app/types';

export function useSelectEngine() {
  const dispatch = useAppDispatch();

  return useCallback(
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
}
