import { test } from '@japa/runner'

test.group('Home home', () => {
  test('should redirect to login when not authenticated', async ({ client }) => {
    const response = await client.get('/home').withInertia()
    response.assertRedirectsTo('/login')
  })
})
