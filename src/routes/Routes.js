import {Router} from "express"
import {login,dashboardCalidad, getAnalisis, getRutas} from '../controllers/InvController'
import {authToken, isCalidad} from '../middlewares/validations'


const router = Router()
    router.post('/login',login)

    router.get('/rutas',getRutas)   
    router.get('/dashCalidad',authToken,dashboardCalidad)
    router.get('/analisis/:idComposicion',getAnalisis)

export default router