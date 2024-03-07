/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from "vitest";

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';

test("is 1 + 1 = 2?", () => {
  expect(1 + 1).toBe(2);
});