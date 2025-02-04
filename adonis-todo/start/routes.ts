/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/auth/login_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('auth/login')
router.post('/login', [LoginController, 'handle'])
