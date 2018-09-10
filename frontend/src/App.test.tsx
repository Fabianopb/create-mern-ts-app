import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import * as React from 'react';
import App, { IAppState } from './App';

const mock = new MockAdapter(axios);

mock.onGet('/api/test-route').reply(200, 'Test route works!');

it('renders without crashing', done => {
  const wrapper = shallow<IAppState>(<App />);
  wrapper.find("button").simulate("click");
  setImmediate(() => {
    expect(wrapper.state().message).toBe('Test route works!');
    done();
  });
});
