import { test, expect, beforeEach, describe } from '@playwright/test'

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
  // move up
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')

    // move to helper func ? / move up
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
    // move up
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')

    await page.evaluate(() => window.localStorage.clear())

    // move to helper func ?
    await page.getByRole('button', { name: 'login' }).click()
    const usernameel = page.locator('#username-input')
    await usernameel.fill('mluukkai')
    const passel = page.locator('#password-input')
    await passel.fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()

    await page.waitForTimeout(1500)
    const storage = await page.context().storageState()
    // console.log('Token', JSON.parse(storage.origins[0].localStorage[0].value).token)
    console.log('Token', storage)
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

    await page.getByRole('button', { name: 'show' }).click()

    let likes_amt = Number(page.locator('.blog-likes span').innerText)

    await page.getByRole('button', { name: 'like' }).click()
  
    await expect(likes_amt).toEqual(likes_amt + 1)
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