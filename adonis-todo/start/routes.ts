/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const CurrentUserController = () => import('#controllers/auth/current_user_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterPageController = () => import('#controllers/auth/register_page_controller')
const LoginPageController = () => import('#controllers/auth/login_page_controller')
const HomePageController = () => import('#controllers/home/home_page_controller')

router.get('/', [HomePageController, 'get'])
router.get('/home', [HomePageController, 'get']) // Auth middleware should be in controller

router.get('/login', [LoginPageController, 'get'])
router.post('/login', [LoginPageController, 'post'])

router.get('/register', [RegisterPageController, 'get'])
router.post('/register', [RegisterPageController, 'post'])

router.get('/current-user', [CurrentUserController, 'respond'])
router.post('/logout', [LogoutController, 'respond'])
