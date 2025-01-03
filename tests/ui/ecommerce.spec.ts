import { test, expect } from '../../src/fixtures/custom-fixtures';
import { HomePage } from '../../src/pageObjects/home/HomePage';
import { ProductPage } from '../../src/pageObjects/product/ProductPage';
import { CartPage } from '../../src/pageObjects/cart/CartPage';

test.use({ headless: false });

test.describe.parallel('@regression', () => {
  test('add product to cart', async ({ page, logger,config }) => {
    const homePage = new HomePage(page, config.baseURL);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    
    // 1. Navigate to the homepage
    await homePage.navigateTo();
    logger.info('Navigated to the homepage');

    // 2. Search for a product
    const searchTerm = 'Hummingbird';
    await homePage.searchForProduct(searchTerm);
    logger.info(`Searched for product: ${searchTerm}`);

    // 3. Add the first product to the cart
    await productPage.selectFirstProduct();
    const productName = await productPage.getProductName();
    logger.info(`Selected product: ${productName}`);

    await productPage.addProductToCart();
    logger.info('Product added to cart successfully');

    await productPage.returnToShopping();
    logger.info('Returned to shopping');

    // 4. Verify the product is in the cart
    await cartPage.navigateToCart();
    await cartPage.verifyProductInCart('1');
    logger.info('Verified product added to cart');
  });
});



test.describe.parallel('@smoke', () => {
    test('add product to carts 4', async ({ page, logger,config }) => {
      const homePage = new HomePage(page, config.baseURL);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      logger.info('smoke');
      logger.info('smoke');
      logger.info('smoke');
      logger.info('smoke');
      // 1. Navigate to the homepage
      await homePage.navigateTo();
      logger.info('Navigated to the homepage');
  
      // 2. Search for a product
      const searchTerm = 'Hummingbird';
      await homePage.searchForProduct(searchTerm);
      logger.info(`Searched for product: ${searchTerm}`);
  
      // 3. Add the first product to the cart
      await productPage.selectFirstProduct();
      const productName = await productPage.getProductName();
      logger.info(`Selected product: ${productName}`);
  
      await productPage.addProductToCart();
      logger.info('Product added to cart successfully');
  
      await productPage.returnToShopping();
      logger.info('Returned to shopping');
  
      // 4. Verify the product is in the cart
      await cartPage.navigateToCart();
      await cartPage.verifyProductInCart('1');
      logger.info('Verified product added to cart');
    });
    test('add product to carts 7', async ({ page, logger,config }) => {
      const homePage = new HomePage(page, config.baseURL);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      // 1. Navigate to the homepage
      await homePage.navigateTo();
      logger.info('Navigated to the homepage');
  
      // 2. Search for a product
      const searchTerm = 'Hummingbird';
      await homePage.searchForProduct(searchTerm);
      logger.info(`Searched for product: ${searchTerm}`);
  
      // 3. Add the first product to the cart
      await productPage.selectFirstProduct();
      const productName = await productPage.getProductName();
      logger.info(`Selected product: ${productName}`);
  
      await productPage.addProductToCart();
      logger.info('Product added to cart successfully');
  
      await productPage.returnToShopping();
      logger.info('Returned to shopping');
  
      // 4. Verify the product is in the cart
      await cartPage.navigateToCart();
      await cartPage.verifyProductInCart('1');
      logger.info('Verified product added to cart');
    });
    test('add product to carts 8', async ({ page, logger,config }) => {
      const homePage = new HomePage(page, config.baseURL);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      // 1. Navigate to the homepage
      await homePage.navigateTo();
      logger.info('Navigated to the homepage');
  
      // 2. Search for a product
      const searchTerm = 'Hummingbird';
      await homePage.searchForProduct(searchTerm);
      logger.info(`Searched for product: ${searchTerm}`);
  
      // 3. Add the first product to the cart
      await productPage.selectFirstProduct();
      const productName = await productPage.getProductName();
      logger.info(`Selected product: ${productName}`);
  
      await productPage.addProductToCart();
      logger.info('Product added to cart successfully');
  
      await productPage.returnToShopping();
      logger.info('Returned to shopping');
  
      // 4. Verify the product is in the cart
      await cartPage.navigateToCart();
      await cartPage.verifyProductInCart('1');
      logger.info('Verified product added to cart');
    });
  });
  

  test.describe.parallel('@smoke', () => {
    test('add product to carts 5', async ({ page, logger,config }) => {
      const homePage = new HomePage(page, config.baseURL);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      logger.info('smoke1');
      // 1. Navigate to the homepage
      await homePage.navigateTo();
      logger.info('Navigated to the homepage');
  
      // 2. Search for a product
      const searchTerm = 'Hummingbird';
      await homePage.searchForProduct(searchTerm);
      logger.info(`Searched for product: ${searchTerm}`);
  
      // 3. Add the first product to the cart
      await productPage.selectFirstProduct();
      const productName = await productPage.getProductName();
      logger.info(`Selected product: ${productName}`);
  
      await productPage.addProductToCart();
      logger.info('Product added to cart successfully');
  
      await productPage.returnToShopping();
      logger.info('Returned to shopping');
  
      // 4. Verify the product is in the cart
      await cartPage.navigateToCart();
      await cartPage.verifyProductInCart('1');
      logger.info('Verified product added to cart');
    });
  });
  