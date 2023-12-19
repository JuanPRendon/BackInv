import {Router} from "express"
import { GetMateriales, loginGrupo, registroGrupo, registroConteo, getGrupo, getConteo, updateConteo, deleteConteo, loginUser,deleteGrupo,updateGrupo } from "../controllers/InvController"


const router = Router()
    router.get('/materiales', GetMateriales)

    router.get('/conteo',getConteo)
    router.post('/conteo',registroConteo)
    router.put('/conteo',updateConteo)
    router.delete('/conteo',deleteConteo)

    router.get('/grupo',getGrupo)
    router.post('/grupo',registroGrupo)
    router.put('/grupo', updateGrupo)
    router.delete('/grupo',deleteGrupo)

    router.get('/loginGrupo', getGrupo)
    router.post('/loginGrupo',loginGrupo)

    router.post('/loginUser', loginUser)


export default router