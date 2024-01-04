import { getConexion } from "../database/conexion";

export const registroMateriales = async(req,res) => {
    try{
      const pool = await getConexion();
      const request = await pool.request()
        .execute('registroMateriales')
      console.log(request.rowsAffected);
      if (request.rowsAffected > 0) {
        res.status(200).json({message:'works'})
      }else{
        res.status(406).json({message:'dont work'})
      }
      pool.close(); 
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  const multer = require('multer');
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '//svrdbvm-auralac/Users/administrador.AURALAC/Desktop/Inteligencia de negocios/Materiales Inventarios')
      },
      filename: function (req, file, cb) {
        cb(null, 'EXPORT.csv')
      }
    })
  export const upload = multer({ storage: storage });