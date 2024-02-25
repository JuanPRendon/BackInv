import {getConexion,sql} from "../database/conexion";
import {createToken} from '../libs/jwt'

  export const login = async(req,res) =>{
    const {user} = req.body
    try {
      const pool = await getConexion();
     const result = await pool.request()
      .input('user',sql.VarChar, user.user)
      .input('pass',sql.VarChar, user.pass)
      .execute('validateLogin')
      pool.close()

      if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})

      const token = await createToken({
        id:result.recordset[0].idUsuario,
        rol: result.recordset[0].idRol
      })
      res.cookie('token',token);
      return res.status(200).json({message: result.recordset[0].nombre})
      
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  export const dashboardCalidad = async(req,res) =>{
    const rol = req.rol
    try {
      const pool = await getConexion();
     const result = await pool.request()
      .input('rol',sql.Int, rol)
      .execute('validarNivelAcceso')
      pool.close()
    return res.status(200).json({message: result.recordset[0].nombre})
    }catch(error){
      res.status(500).json({message:error.message})
    }
  }

  export const logout = (req,res) =>{
    res.clearCookie('token')
    res.clearCookie('grupo')
    res.clearCookie('almacen')
    res.sendStatus(200)
  }
