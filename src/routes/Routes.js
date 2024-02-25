import {Router} from "express"
import {login,dashboardCalidad} from '../controllers/InvController'
import {authRequired} from '../middlewares/validations'


const router = Router()
    router.post('/login',login)
    router.get('/dashCalidad',authRequired,dashboardCalidad)

export default router