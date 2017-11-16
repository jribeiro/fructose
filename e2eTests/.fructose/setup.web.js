/* globals beforeAll jasmine afterAll */
import fructose from "@times-components/fructose/setup";
import { Chromeless } from "chromeless";

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  await fructose.hooks.web.setup(3000, 60000);
  global.Chromeless = Chromeless;
}, 60000);

afterAll(async () => {
  await fructose.hooks.web.cleanup();
});