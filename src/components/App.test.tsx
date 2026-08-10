import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import configReducer from '../features/config/configSlice';
import { Color, Model } from '../app/types';
import App from './App';

vi.mock('../app/api', () => ({
  getModels: vi.fn(),
  getColors: vi.fn(),
}));

// external-svg-loader mutates the DOM to resolve <svg data-src> at runtime
// and is unrelated to the behaviour under test, so it is stubbed out.
vi.mock('external-svg-loader', () => ({}));

import { getColors, getModels } from '../app/api';

const mockModels: Model[] = [
  {
    id: 1,
    name: 'PRO RS3',
    engines: [
      {
        capacity: '2.0L',
        price: 1000,
        gearboxes: [
          { name: 'manual', price: 100 },
          { name: 'automatic', price: 200 },
        ],
      },
    ],
  },
];

const mockColors: Color[] = [
  { id: 1, name: 'Martro Grey', value: '#333333', price: 500 },
];

function renderApp() {
  const store = configureStore({ reducer: { config: configReducer } });
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  afterEach(() => {
    vi.mocked(getModels).mockReset();
    vi.mocked(getColors).mockReset();
  });

  it('renders the SkeletonScreen while configuration data is loading', () => {
    vi.mocked(getModels).mockReturnValue(new Promise(() => {}));
    vi.mocked(getColors).mockReturnValue(new Promise(() => {}));

    renderApp();

    expect(
      screen.getByRole('status', { name: 'Loading car configurator.' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Fetching available/)).not.toBeInTheDocument();
  });

  it('renders an error StatusScreen when loading configuration data fails', async () => {
    vi.mocked(getModels).mockRejectedValue(new Error('Network error'));
    vi.mocked(getColors).mockResolvedValue(mockColors);

    renderApp();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(
      screen.queryByRole('status', { name: 'Loading car configurator.' }),
    ).not.toBeInTheDocument();
  });

  it('renders the Form and Summary sections in the expected order once data loads', async () => {
    vi.mocked(getModels).mockResolvedValue(mockModels);
    vi.mocked(getColors).mockResolvedValue(mockColors);

    const { container } = renderApp();

    await screen.findByText('Your PRO RS3');

    expect(
      screen.queryByRole('status', { name: 'Loading car configurator.' }),
    ).not.toBeInTheDocument();

    const sections = container.querySelectorAll('main > section');
    expect(sections).toHaveLength(2);

    const [formSection, summarySection] = sections;
    expect(formSection.className).toContain('order-last');
    expect(formSection.className).toContain('md:order-first');
    expect(summarySection.className).toContain('order-first');
    expect(summarySection.className).toContain('md:order-last');
  });

  it('dispatches the first model, engine and color as the default selection after loading', async () => {
    vi.mocked(getModels).mockResolvedValue(mockModels);
    vi.mocked(getColors).mockResolvedValue(mockColors);

    renderApp();

    expect(await screen.findByText('Your PRO RS3')).toBeInTheDocument();
    expect(screen.getByText('2.0L')).toBeInTheDocument();
    expect(screen.getByText('manual')).toBeInTheDocument();
    expect(screen.getByText('Martro Grey')).toBeInTheDocument();
  });
});