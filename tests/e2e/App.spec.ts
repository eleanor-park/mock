import { expect, test } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test('on page load, i see a login button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('i can sign in and sign out repeatedly', async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();

  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Login")).toBeVisible();

  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
})

test('after I type into the input box, its text changes', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file something');

  let mock_input = `load_file something`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)

  // test really long input that goes off screen
  await page
    .getByLabel("Command input")
    .fill(
      "akjg alrjglj;rboiljf;boiajf;boijf;oibja;oifgbj;aoifbj;oifgj;aoifjb;iaj;agikjf;iogjuao;irguj;oiraug;irut;iourio;;aiodfh;ufhbujak;fhugbujfhg;iuahg;ioaurhjf;oijer;oafihji;eoahf;ioe;fh"
    );
  mock_input =
    "akjg alrjglj;rboiljf;boiajf;boijf;oibja;oifgbj;aoifbj;oifgj;aoifjb;iaj;agikjf;iogjuao;irguj;oiraug;irut;iourio;;aiodfh;ufhbujak;fhugbujfhg;iuahg;ioaurhjf;oijer;oafihji;eoahf;ioe;fh";
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test('i can submit input with a button', async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file something");
  await page.getByLabel("Submit").click();

  await expect(page.getByLabel('Command input')).not.toHaveValue("load something")
  await expect(page.getByLabel("Command input")).toHaveValue("");

  // refill and resubmit
  await page.getByLabel("Command input").fill("load something again");
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).not.toHaveValue(
    "load something again"
  );
  await expect(page.getByLabel("Command input")).toHaveValue("");
});

test("if i log out then login, the history disappears", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file numbers-basic.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText('Successfully loaded file from "numbers-basic.csv"!')).toBeVisible();

  await page.getByLabel("Sign Out").click();
  await page.getByLabel("Login").click();
  await expect(
    page.getByText('Successfully loaded file from "numbers-basic.csv"!')
  ).not.toBeVisible();
});