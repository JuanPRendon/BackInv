import {Router} from "express"
import { crearDocumento, getDocumento, getDocumentos, loginUsuario } from "../controllers/invController"

const router = Router()
    router.post('/login',loginUsuario)

    router.get('/documento/:idDocumento',getDocumento)
    router.get('/documento',getDocumentos)
    router.post('/documento',crearDocumento)


export default router