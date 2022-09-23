import React from "react";
import { MemoryRouter } from "react-router-dom";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import App from "./App";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeCreator from "./components/RecipeCreator/RecipeCreator";
import axios from "axios";
import nock from "nock";
import nodeFetch from "node-fetch";
axios.defaults.adapter = require("axios/lib/adapters/http");

const number1 = "1";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  global.fetch = nodeFetch;

  let store;
  const routes = ["/", "/home", "/recipes", "/recipes/1"];
  const mockStore = configureStore([thunk]);
  const state = {
    recipes: number1,
  };

  beforeEach(async () => {
    const apiMock = nock("http://localhost:3001").persist();

    apiMock.get("/home").reply(200, number1);

    apiMock.get(/\/home\/\d/).reply(200, (uri, requestBody) => {
      const idStr = uri.split("/").pop();
      const id = Number(idStr);
      return number1.find((recipe) => recipe.id === id);
    });

    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("Nav should be renderized in every route", () => {
    it('Should not be renderize in route "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Nav)).toHaveLength(1);
    });

    it('Should renderize in route "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Nav)).toHaveLength(1);
    });
  });

  it('Should renderize in route "/recipes"', () => {
    const app = mount(componentToUse(routes[2]));
    expect(app.find(Nav)).toHaveLength(1);
  });

  it('Should renderize in route "/recipes/1"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(Nav)).toHaveLength(1);
  });

  xit('Components "Home"should be only renderize in route "/home"', () => {
    const app = mount(componentToUse(routes[1]));
    expect(app.find(Home)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });
});
