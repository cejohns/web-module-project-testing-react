import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import server from '../../../backend/mock-server';
import App from '../App';

describe('Stranger Things App', () => {
  let user;
  afterEach(() => { server.resetHandlers() });
  beforeAll(() => { server.listen() });
  afterAll(() => { server.close() });
  beforeEach(() => {
    render(<App />);
    user = userEvent.setup();
  });

  test('App mounts without crashing', () => {
    // 👉 TASK: print the simulated DOM using screen.debug
    screen.debug();
  });

  test('App renders the correct texts', async () => {
    // 👉 TASK: click on the button that displays "Press to Get Show Data"
    await user.click(screen.getByRole('button', { name: /Press to Get Show Data/i }));

    // 👉 TASK: create a waitFor and await for the following to be true:
    await waitFor(() => {
      //    - The text "Press to Get Show Data" is no longer in the DOM
      expect(screen.queryByText(/Press to Get Show Data/i)).not.toBeInTheDocument();
      //    - The text "Stranger Things" exists in the DOM
      expect(screen.getByText(/Stranger Things/i)).toBeInTheDocument();
      //    - The text "A love letter to the '80s classics that captivated a generation" exists in the DOM
      expect(screen.getByText(/A love letter to the '80s classics that captivated a generation/i, { exact: false })).toBeInTheDocument();
      //    - The text "Select A Season" exists in the DOM
      expect(screen.getByText(/Select A Season/i)).toBeInTheDocument();
    }, { exact: false });

    // 👉 TASK: select Season 2 from the dropdown
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, ['Season 2']);

    // 👉 TASK: create the following assertions:
    await waitFor(() => {
      //    - The text "Season 2, Episode 1" exists in the DOM
      expect(screen.getByText(/Season 2, Episode 1/i)).toBeInTheDocument();
      //    - The text "Chapter One: MADMAX" exists in the DOM
      expect(screen.getByText(/Chapter One: MADMAX/i)).toBeInTheDocument();
      //    - The text "One year after the events with the Upside Down and the Demogorgon" exists in the DOM
      expect(screen.getByText(/One year after the events with the Upside Down and the Demogorgon/i, { exact: false })).toBeInTheDocument();
    }, { exact: false });
  });
});
