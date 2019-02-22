import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { shallow } from "enzyme";
import * as React from "react";
import App, { AppState } from "./App";

let mock: MockAdapter;
const mockItemsResponse = [{ name: "item1", value: 1 }];
const mockLoginResponse = { expiry: "2020-01-01T10:00:00.000Z", token: "abcd123" };
const mockUserCredentials = { email: "user-email", password: "user-password" };

beforeEach(() => {
  mock = new MockAdapter(axios);
  localStorage.clear();
});

it("conditionally renders based on session", () => {
  const invalidSessionWrapper = shallow<AppState>(<App />);
  expect(invalidSessionWrapper.find("div[className='App-login']")).toHaveLength(1);
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  localStorage.setItem("expiry", expiry.toISOString());
  const validSessionWrapper = shallow<AppState>(<App />);
  expect(validSessionWrapper.find("div[className='App-private']")).toHaveLength(1);
});

it("can handle login", done => {
  mock.onPost("/api/users/login", mockUserCredentials).reply(200, mockLoginResponse);
  const wrapper = shallow<AppState>(<App />);
  wrapper.find("input[placeholder='email']").simulate("change", { target: { value: mockUserCredentials.email } });
  wrapper.find("input[placeholder='password']").simulate("change", { target: { value: mockUserCredentials.password } });
  wrapper.find("button[children='Log in']").simulate("click");
  setImmediate(() => {
    expect(wrapper.state().isLoggedIn).toBe(true);
    done();
  });
});

it("can catch login errors", done => {
  mock.onPost("/api/users/login").reply(400);
  const wrapper = shallow<AppState>(<App />);
  wrapper.setState({ email: "user-email", password: "user-password" });
  wrapper.find("button[children='Log in']").simulate("click");
  setImmediate(() => {
    expect(wrapper.state().error).toBe("Something went wrong");
    done();
  });
});

it("can handle logout", () => {
  const wrapper = shallow<AppState>(<App />);
  wrapper.setState({ isLoggedIn: true });
  wrapper.find("button[children='Log out']").simulate("click");
  expect(wrapper.state().isLoggedIn).toBe(false);
});

it("can get data", done => {
  mock.onGet("/api/items").reply(200, mockItemsResponse);
  const wrapper = shallow<AppState>(<App />);
  wrapper.setState({ isLoggedIn: true });
  wrapper.find("button[children='Get test data']").simulate("click");
  setImmediate(() => {
    expect(wrapper.state().data).toEqual(mockItemsResponse);
    done();
  });
});

it("can catch data errors", done => {
  mock.onGet("/api/items").reply(400);
  const wrapper = shallow<AppState>(<App />);
  wrapper.setState({ isLoggedIn: true });
  wrapper.find("button[children='Get test data']").simulate("click");
  setImmediate(() => {
    expect(wrapper.state().error).toBe("Something went wrong");
    done();
  });
});
