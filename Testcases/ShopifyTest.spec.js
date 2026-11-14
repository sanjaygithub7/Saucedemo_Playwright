import { test, expect } from "@playwright/test";

test("Verify successful application launch", async ({ page }) => {
  //Launch the application
  await page.goto("https://sauce-demo.myshopify.com/");

  //verify the home page is displayed
  const homepagecontent = page.locator("id=sauce-demo");
  await expect(homepagecontent).toBeVisible();

  //Verify the home page heading/title
  await expect(page).toHaveTitle("Sauce Demo");

  //verify the product listing is displayed
  const productlisting = page.locator(
    "//section[@class='product-grid twelve columns alpha omega']",
  );
  await expect(productlisting).toBeVisible();
});

test("Verify product listings on the homepage", async ({ page }) => {
  //Launch the application
  await page.goto("https://sauce-demo.myshopify.com/");

  //Verify the product listing is displayed
  const productlisting = page.locator(
    "//section[@class='product-grid twelve columns alpha omega']",
  );
  await expect(productlisting).toBeVisible();

  //retrive all product listing names
  const products = page.locator(
    "//section[@class='product-grid twelve columns alpha omega']/div/a/h3",
  );

  const productnames = await products.allTextContents();

  productnames.forEach((name) => {
    let trimmedname = name.trim();

    //Verify that the product listing contains at least one product
    expect(trimmedname.length).toBeGreaterThan(0);
    //print Product names
    console.log(trimmedname);
  });

  //Verify the product count >0
  const product = page.$$(
    "//section[@class='product-grid twelve columns alpha omega']/div",
  );
  expect((await product).length).toBeGreaterThan(0);

  //Verify the product price
  const productprices =page.locator(
    "//section[@class='product-grid twelve columns alpha omega']/div/a/h4",
  );

  const productprice = await productprices.allTextContents();

  expect(productprice.length).toBeGreaterThan(0);

  productprice.forEach((price) => {
    const convertedprice = parseFloat(price.replace(/[^0-9.]/g, ""));
    expect(convertedprice).toBeGreaterThan(0);
    console.log(convertedprice);
  });

 
});
