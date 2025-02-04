/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const RegistersController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router.on('/').renderInertia('home')
router.on('/home').renderInertia('home')
router.on('/login').renderInertia('auth/login')
router.post('/login', [LoginController, 'respond'])
router.on('/register').renderInertia('auth/register')
router.post('/register', [RegistersController, 'respond'])
