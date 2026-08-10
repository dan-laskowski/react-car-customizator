import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configReducer, {
  changeColor,
  changeEngine,
  changeGearbox,
  changeModel,
} from '../features/config/configSlice';
import Summary from './Summary';

// external-svg-loader mutates the DOM to resolve <svg data-src> at runtime.
// It has no relevance to the component logic under test, so it is stubbed.
vi.mock('external-svg-loader', () => ({}));

function renderWithStore() {
  const store = configureStore({ reducer: { config: configReducer } });

  return render(
    <Provider store={store}>
      <Summary />
    </Provider>,
  );
}

describe('Summary', () => {
  it('does not render the car model image or heading when model/color are unset', () => {
    renderWithStore();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/^Your /)).not.toBeInTheDocument();
  });

  it('renders the car svg with the correct aria-label and data-src once model and color are set', () => {
    const store = configureStore({ reducer: { config: configReducer } });
    store.dispatch(changeModel('PRO RS3'));
    store.dispatch(
      changeColor({ name: 'Martro Grey', value: '#333333', price: 500 }),
    );

    render(
      <Provider store={store}>
        <Summary />
      </Provider>,
    );

    const image = screen.getByRole('img', { name: 'PRO RS3 car model' });
    expect(image).toHaveAttribute('data-src', '/assets/PRO RS3.svg');
    expect(screen.getByText('Your PRO RS3')).toBeInTheDocument();
  });

  it('applies the updated height utility class to the car svg', () => {
    const store = configureStore({ reducer: { config: configReducer } });
    store.dispatch(changeModel('UBER RS2'));
    store.dispatch(
      changeColor({ name: 'Varrow Blue', value: '#0000ff', price: 300 }),
    );

    render(
      <Provider store={store}>
        <Summary />
      </Provider>,
    );

    const image = screen.getByRole('img', { name: 'UBER RS2 car model' });
    expect(image.className).toContain('h-21');
  });

  it('renders engine, gearbox and color labels from state', () => {
    const store = configureStore({ reducer: { config: configReducer } });
    store.dispatch(changeEngine({ name: '2.0L', price: 1000 }));
    store.dispatch(changeGearbox({ name: 'automatic', price: 200 }));
    store.dispatch(
      changeColor({ name: 'Linel Green', value: '#00ff00', price: 400 }),
    );

    render(
      <Provider store={store}>
        <Summary />
      </Provider>,
    );

    expect(screen.getByText('2.0L')).toBeInTheDocument();
    expect(screen.getByText('automatic')).toBeInTheDocument();
    expect(screen.getByText('Linel Green')).toBeInTheDocument();
  });

  it('calculates and displays the total price from engine, gearbox and color', () => {
    const store = configureStore({ reducer: { config: configReducer } });
    store.dispatch(changeEngine({ name: '2.0L', price: 1000 }));
    store.dispatch(changeGearbox({ name: 'manual', price: 200 }));
    store.dispatch(
      changeColor({ name: 'Sidney Yellow', value: '#ffff00', price: 50 }),
    );

    render(
      <Provider store={store}>
        <Summary />
      </Provider>,
    );

    expect(screen.getByText('TOTAL $1250')).toBeInTheDocument();
  });

  it('shows a total of $0 when no options have been selected', () => {
    renderWithStore();

    expect(screen.getByText('TOTAL $0')).toBeInTheDocument();
  });

  it('embeds the selected color value into the inline style tag', () => {
    const store = configureStore({ reducer: { config: configReducer } });
    store.dispatch(
      changeColor({ name: 'Martro Grey', value: '#abcdef', price: 500 }),
    );

    const { container } = render(
      <Provider store={store}>
        <Summary />
      </Provider>,
    );

    const style = container.querySelector('style');
    expect(style?.textContent).toContain('#abcdef');
  });
});