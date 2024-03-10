const { test, expect, beforeEach, describe } = require('@playwright/test')

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

  // exc 5.19
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // move to helper func ?
      await page.getByRole('button', { name: 'login' }).click()
      const usernameel = page.locator('#username-input')
      await usernameel.fill('mluukkai')
      const passel = page.locator('#password-input')
      await passel.fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    // webkit fails for some reason
    test('a new blog can be created', async ({ page }) => {
      // fill in blog form
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.locator('input[name="Title"]').fill('Sample title')
      await page.locator('input[name="Author"]').fill('Sample author')
      await page.locator('input[name="Url"]').fill('Sample url')

      await page.getByRole('button', { name: 'create' }).click()

      // test blog in list and info message are visible
      const infomsg = page.locator('div.info')
      await expect(infomsg).toBeVisible()
      await expect(infomsg).toHaveText('A new blog Sample title by Sample author is added')

      const blogElem = page.locator('#blogs-list div:first-child div.blog-title')
      await expect(blogElem).toBeVisible()
      await expect(blogElem).toHaveText('Sample title')
    })
  })

  describe('When user has created a new blog', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3001/api/blogs', {
        data: {
          'title': 'Title',
          'author': 'Author',
          'url': 'Url',
          'likes': 0
        }
      })
    })
    
    // exc 5.20
    // Do a test that makes sure the blog can be edited.
    test('blog can be edited (liked)', async ({ page }) => {
    
      // TODO
    
      await expect({}).toEqual({})
    })
      
    // exc 5.21
    // user who added the blog can delete the blog
    test('user who added the blog can delete the blog', async ({ page }) => {
    
      // TODO
    
      await expect({}).toEqual({})
    })
      
    // exc 5.22
    // only the user who added the blog sees the blog's delete button
    test('only the user who added the blog sees the blogs delete button', async ({ page }) => {
    
      // TODO
    
      await expect({}).toEqual({})
    })
  })
    
  // exc 5.23
  // that the blogs are arranged in the order according to the likes, the blog with the most likes first.
  describe('Some blogs are present', () => {
    beforeEach(async ({ page }) => {
      // login

      // user adds blog through api call
    })

    test('blogs are arranged most liked first', async ({ page }) => {
    
      // TODO
    
      await expect({}).toEqual({})
    })
  })
})
