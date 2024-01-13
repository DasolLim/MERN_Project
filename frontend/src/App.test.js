import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from './home.css';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
      <Home />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
