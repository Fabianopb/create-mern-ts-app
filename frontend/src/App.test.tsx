import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import * as React from 'react';
import App, { IAppState } from './App';

const mock = new MockAdapter(axios);

mock.onGet('/api/test-route').reply(200, 'Test route works!');

it('renders without crashing', async () => {
  const wrapper = shallow<IAppState>(<App />);
  await (wrapper.instance() as App).componentDidMount();
  expect(wrapper.state().message).toBe('Test route works!');
});
