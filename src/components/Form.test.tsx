import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configReducer from '../features/config/configSlice';
import { Color, Model } from '../app/types';
import Form from './Form';

const models: Model[] = [
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

const colors: Color[] = [
  { id: 1, name: 'Martro Grey', value: '#333333', price: 500 },
];

function renderForm() {
  const store = configureStore({ reducer: { config: configReducer } });
  return render(
    <Provider store={store}>
      <Form models={models} colors={colors} />
    </Provider>,
  );
}

describe('Form', () => {
  it('renders its content inside a plain div rather than a <main> element', () => {
    const { container } = renderForm();

    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('does not render a nested <main> landmark', () => {
    // App.tsx now provides the single top-level <main> landmark for the
    // page, so Form must not introduce a second, duplicate one.
    const { container } = renderForm();

    expect(container.querySelector('main')).toBeNull();
  });

  it('renders the Model, Engine and Paint option groups', () => {
    renderForm();

    expect(screen.getByRole('heading', { name: 'Model' })).toBeInTheDocument();
    // "Engine" is rendered as a label both for the top-level engine tab
    // group and again inside the selected model's panel.
    expect(
      screen.getAllByRole('heading', { name: 'Engine' }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText('Paint')).toBeInTheDocument();
  });

  it('renders a tab option for each provided model and color', () => {
    renderForm();

    expect(screen.getByText('PRO RS3')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(
      // model tab + engine tab + gearbox tabs (2)
      1 + 1 + 2,
    );
  });
});