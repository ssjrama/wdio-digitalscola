const data_login = [
    {
      username: 'standard_user',
      password: 'secret_sauce',
      valid: true
    },
    {
      username: 'standard_use',
      password: 'secret_sauc',
      valid: false,
      message: 'wrong'
    },
    {
      username: '',
      password: '',
      valid: false,
      message: 'empty'
    },
  ];
  
  describe('Login Tests', () => {
    data_login.forEach((data) => {
      it(`Login with username: ${data.username}`, async () => {
        await browser.url('https://www.saucedemo.com/');
        const usernameInput = await $('[placeholder="Username"]');
        const passwordInput = await $('[placeholder="Password"]');
  
        await usernameInput.setValue(data.username);
        await passwordInput.setValue(data.password);
        await browser.keys('Enter')
  
        if (data.valid) {
          const itemTitle = await $('[data-test="item-4-title-link"]');
          await expect(itemTitle).toHaveText('Sauce Labs Backpack');
        } else {
          const errorMessage = await $('[data-test="error"]');
          if (data.message == 'wrong') {
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
          } else if (data.message == 'empty') {
            await expect(errorMessage).toHaveText('Epic sadface: Username is required');
          }
        }
      });
    });
  });
  