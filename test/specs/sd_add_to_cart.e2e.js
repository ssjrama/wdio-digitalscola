const data_login = [
    {
      username: 'standard_user',
      password: 'secret_sauce',
      valid: true
    }
  ];
  
  describe('Add To Cart Tests', () => {
    data_login.forEach((data) => {
      it(`Add 1 Item`, async () => {
        await browser.url('https://www.saucedemo.com/');
        const usernameInput = await $('[placeholder="Username"]');
        const passwordInput = await $('[placeholder="Password"]');
  
        await usernameInput.setValue(data.username);
        await passwordInput.setValue(data.password);
        await browser.keys('Enter')
  
        if (data.valid) {
          const addToCart = await $('[data-test="add-to-cart-sauce-labs-backpack"]');
          await addToCart.click();

          const cartBadge = await $('[data-test="shopping-cart-badge"]');
          await expect(cartBadge).toHaveText('1');
        }
      });
    });
  });
  