import {Router} from "express"
import { GetMateriales, loginGrupo, registroGrupo, registroConteo, getGrupo, getConteo, updateConteo, deleteConteo, loginUser,deleteGrupo,updateGrupo, recuento, getAlmacenes, getUsuario, registroUsuario, updateUsuario, deleteUsuario } from "../controllers/InvController"
import registroMateriales from "../controllers/fileController";
const multer = require('multer');
const upload = multer({ dest: '../../archivos/' });

const router = Router()
    router.get('/materiales', GetMateriales)
    router.post('/materiales', upload.single('file'),async (req,res) => {
        const filepath = req.file.path
        await registroMateriales(filepath)
        res.json({ success: true });
    })

    router.get('/almacenes', getAlmacenes)
    router.get('/recuento',recuento)

    router.get('/conteo',getConteo)
    router.post('/conteo',registroConteo)
    router.put('/conteo',updateConteo)
    router.delete('/conteo',deleteConteo)

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


export default router