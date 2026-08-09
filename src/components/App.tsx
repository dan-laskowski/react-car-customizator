import { JSX, useState, useEffect } from 'react';
import Form from './Form';
import Summary from './Summary';
import { Color, Model } from '../app/types';
import { useAppDispatch } from '../app/hooks';
import { getColors, getModels } from '../app/api';
import { changeModel, changeColor } from '../features/config/configSlice';
import StatusScreen from './StatusScreen';
import { useSelectEngine } from '../features/config/useSelectEngine';

const App = (): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  const dispatch = useAppDispatch();

  const selectEngine = useSelectEngine();

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

  return (
    <div className="dark:bg-slate-900 bg-gray-50">
      {error ? (
        <StatusScreen variant="error" text={error} />
      ) : isLoading ? (
        <StatusScreen
          variant="loading"
          text="Fetching available configurations..."
        />
      ) : (
        <main className="mx-4 w-max-xl min-h-screen font-outfit flex flex-col-reverse md:flex-row ">
          <section className="mb-4 min-h-min  md:h-auto w-full grid place-items-center ">
            <Form models={models} colors={colors} />
          </section>
          <section className="w-full min-h-min h-1/2 md:h-auto dark:bg-blue-800 bg-neutral-200 rounded-lg md:rounded-l-lg my-4 md:grid md:place-items-center">
            <Summary />
          </section>
        </main>
      )}
    </div>
  );
};

export default App;
