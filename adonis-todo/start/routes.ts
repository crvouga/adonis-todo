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
const TodoListCreatePageController = () => import('#controllers/todo_list/create_page_controller')
const TodoListController = () => import('#controllers/todo_list/todo_list_controller')
const SwaggerController = () => import('#controllers/swagger/swagger_controller')

router.get('/', [HomePageController, 'get'])
router.get('/home', [HomePageController, 'get']) // Auth middleware should be in controller

router.get('/login', [LoginPageController, 'get'])
router.post('/login', [LoginPageController, 'post'])

router.get('/register', [RegisterPageController, 'get'])
router.post('/register', [RegisterPageController, 'post'])

router.get('/current-user', [CurrentUserController, 'respond'])
router.post('/logout', [LogoutController, 'respond'])

router.get('/todo-lists/create', [TodoListCreatePageController, 'get'])
router.post('/todo-lists/create', [TodoListCreatePageController, 'post'])
router.get('/api/todo-lists', [TodoListController, 'get'])

router.get('/swagger', [SwaggerController, 'getSwaggerUi'])
router.get('/swagger/*', [SwaggerController, 'getSwaggerFile'])
