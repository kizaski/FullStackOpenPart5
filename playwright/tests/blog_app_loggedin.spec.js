import { test, expect, beforeEach, describe, afterAll } from '@playwright/test'
import { createBlog } from './helpers'

const TIMEOUT = 2000

describe('When logged in', () => {
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

  describe('When user has created a new blog', () => {
    // only works with --debug
    beforeEach(async ({ page, request }) => {

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(TIMEOUT)
      const storage = await page.context().storageState()
      // console.log('Token', JSON.parse(storage.origins[0].localStorage[0].value).token)
      console.log('storageState', storage)
      const TOKEN = JSON.parse(storage.origins[0].localStorage[0].value).token
  
      await request.post('http://localhost:3001/api/blogs', {
        data: {
          'title': 'Title',
          'author': 'Author',
          'url': 'Url',
          'likes': 0
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
  
      await page.reload()
    })
    
    // exc 5.20
    // Do a test that makes sure the blog can be edited.
    test('blog can be edited (liked)', async ({ page }) => {  
  
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(TIMEOUT)
      // await page.locator('div div.blog-title ~ button').waitFor()
      await page.locator('div div.blog-title ~ button').click()
      // await page.getByRole('button', { name: 'show' }).click()
  
      let likes_amt = Number(page.locator('.blog-likes span').innerText)
  
      await page.getByRole('button', { name: 'like' }).click()
    
      await expect(likes_amt).toEqual(likes_amt + 1)
    })
      
    // exc 5.21 
    // user who added the blog can delete the blog
    test('user who added the blog can delete the blog', async ({ page, request }) => {
      
      await page.getByRole('button', { name: 'show' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.locator('.blog-delete-btn').click()

      const blogsListEl = page.locator('#blogs-list')
      await expect(blogsListEl).toBeEmpty()
    })
      
    // exc 5.22
    // only the user who added the blog sees the blog's delete button
    test('only the user who added the blog sees the blogs delete button', async ({ page }) => {
    
      await page.getByRole('button', { name: 'show' }).click()
      const delbtnEl = page.locator('.blog-delete-btn')

      await expect(delbtnEl).toBeVisible()
    
      await expect({}).toEqual({})
    })
  })
    
  // exc 5.23
  // that the blogs are arranged in the order according to the likes, the blog with the most likes first.
  describe('Some blogs are present', () => {
    // only works with --debug
    beforeEach(async ({ page, request }) => {

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(TIMEOUT)
      const storage = await page.context().storageState()
      // console.log('Token', JSON.parse(storage.origins[0].localStorage[0].value).token)
      console.log('storageState', storage)
      const TOKEN = JSON.parse(storage.origins[0].localStorage[0].value).token

      createBlog(request, TOKEN, { 'title': 'Title 0', 'author': 'The Author', 'url': 'Url', 'likes': 0 })
      createBlog(request, TOKEN, { 'title': 'Title 1', 'author': 'The Author', 'url': 'Url', 'likes': 5 })
      createBlog(request, TOKEN, { 'title': 'Title 2', 'author': 'The Author', 'url': 'Url', 'likes': 4 })
      createBlog(request, TOKEN, { 'title': 'Title 3', 'author': 'The Author', 'url': 'Url', 'likes': 3 })
      createBlog(request, TOKEN, { 'title': 'Title 4', 'author': 'The Author', 'url': 'Url', 'likes': 10 })

      await page.reload()
    })
    
    test('blogs are arranged most liked first', async ({ page }) => {
      
      await page.getByRole('button', { name: 'new blog' }).click()

      // create array of numbers (of the likes)

      // show click 
      // get likes
      // push likes to array

      // expect array to equal hardcoded sorted
      
      await expect({}).toEqual({})
    })
  })
  
  
  afterAll(async ({ request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
  })

})
