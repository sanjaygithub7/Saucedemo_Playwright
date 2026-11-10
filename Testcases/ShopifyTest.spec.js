import {test,expect} from '@playwright/test'

test('Verify successful application launch',async({page})=>{
//Launch the application
await page.goto('https://sauce-demo.myshopify.com/');

//verify the home page is displayed
const homepagecontent=page.locator('id=sauce-demo')
await expect(homepagecontent).toBeVisible()

//Verify the home page heading/title
 await expect(page).toHaveTitle('Sauce Demo')

 //verify the product listing is displayed
 const productlisting=page.locator("//section[@class='product-grid twelve columns alpha omega']")
 await expect(productlisting).toBeVisible()

})