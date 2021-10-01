import React from 'react';
import { render, } from '@testing-library/react';
import App from './App';


describe('App', () => {
  test('renders app without crashing', () => {
    render(<App />);
  });
})
