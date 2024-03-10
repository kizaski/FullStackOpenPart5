import { test, expect, beforeEach, describe } from '@playwright/test'

// tests pass unreliably
// https://github.com/microsoft/playwright/issues/12193

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  // exc 5.18
  test('Login form is shown', async ({ page }) => {
    const { test, expect } = require('@playwright/test')
    await page.goto('http://localhost:5173')

    const loginbtn = page.getByRole('button', { name: 'login' })
    await loginbtn.click()
    const form = page.locator('#login-form')
    await expect(form).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      test.setTimeout(0)
      await page.getByRole('button', { name: 'login' }).click()

      // fill in fields
      const usernameel = page.locator('#username-input')
      await usernameel.fill('mluukkai')

      const passel = page.locator('#password-input')
      await passel.fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()

      // test if elements are present and local storage
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

      const localStorage = await page.evaluate(() => {
        return JSON.parse(JSON.stringify(window.localStorage))
      })
      
      await expect(localStorage).toBeDefined()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      // fill in fields
      const usernameel = page.locator('#username-input')
      await usernameel.fill('wrong_username')

      const passel = page.locator('#password-input')
      await passel.fill('wrong_password')

      await page.getByRole('button', { name: 'login' }).click()

      // test error message and local storage
      const errormsg = page.locator('div.error')
      await expect(errormsg).toBeVisible()
      await expect(errormsg).toHaveText('Wrong credentials')

      const localStorage = await page.evaluate(() => {
        return JSON.parse(JSON.stringify(window.localStorage))
      })

      await expect(localStorage).toEqual({})
    })
  })

  
})
