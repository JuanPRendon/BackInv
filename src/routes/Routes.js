import {Router} from "express"
<<<<<<< HEAD
import { getMateriales,GetMaterialesConteo, loginGrupo, registroGrupo, registroConteo, getGrupo, getConteo, updateConteo, deleteConteo, loginUser,deleteGrupo,updateGrupo, recuento, getAlmacenes, getUsuario, registroUsuario, updateUsuario, deleteUsuario, getMaterialesDoc } from "../controllers/InvController"
import {registroMateriales,upload} from "../controllers/fileController"


const router = Router()
    router.get('/materiales',getMateriales)
    router.post('/materiales',upload.single("file"), registroMateriales)

    router.get('/recuento',recuento)

    router.get('/materialesConteo',GetMaterialesConteo)
    router.get('/conteo',getConteo)
    router.post('/conteo',registroConteo)
    router.put('/conteo',updateConteo)
    router.delete('/conteo',deleteConteo)

    router.get('/materialesDocumento', getMaterialesDoc)

    router.get('/grupo',getGrupo)
    router.post('/grupo',registroGrupo)
    router.put('/grupo', updateGrupo)
    router.delete('/grupo',deleteGrupo)

    router.get('/usuario', getUsuario)
    router.post('/usuario',registroUsuario)
    router.put('/usuario',updateUsuario)
    router.delete('/usuario',deleteUsuario)

    router.get('/loginGrupo', getGrupo)
    router.post('/loginGrupo',loginGrupo)

    router.post('/loginUser', loginUser)
=======
import {login,dashboardCalidad, getAnalisis, getRutas} from '../controllers/InvController'
import {authToken, isCalidad} from '../middlewares/validations'


const router = Router()
    router.post('/login',login)
>>>>>>> ac400390c638a2400625ad33a4e8989c16260781

    router.get('/rutas',getRutas)   
    router.get('/dashCalidad',authToken,dashboardCalidad)
    router.get('/analisis/:idComposicion',getAnalisis)

export default router