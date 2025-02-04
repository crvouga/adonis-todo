/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const RegistersController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router
  .on('/')
  .renderInertia('home')
  .use(middleware.auth({ guards: ['web'] }))
router
  .on('/home')
  .renderInertia('home')
  .use(middleware.auth({ guards: ['web'] }))
router.on('/login').renderInertia('auth/login')
router.post('/login', [LoginController, 'respond'])
router.on('/register').renderInertia('auth/register')
router.post('/register', [RegistersController, 'respond'])
