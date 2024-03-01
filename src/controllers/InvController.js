import {getConexion,sql} from "../database/conexion";
import {createToken} from '../libs/jwt'

  export const login = async(req,res) =>{
    const {user} = req.body
    try {
    const pool = await getConexion()
    const result = await pool.request()
      .input('user',sql.VarChar, user.user)
      .input('pass',sql.VarChar, user.pass)
      .execute('validateLogin')
    pool.close()

    if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})

    const token = await createToken({
        id:result.recordset[0].idUsuario,
        rol: result.recordset[0].nombre
    })
      res.cookie('token',token);
      return res.status(200).json({
        message: result.recordset[0].nombre,
      })
      
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  export const dashboardCalidad = async(req,res) =>{
    try {
      const rol = req.rol
      const pool = await getConexion();

      const analisis = await pool.request()
      .execute('getAnalisis')
      pool.close()

    return res.status(200).json({
      rol : rol,
      analisis: analisis.recordset,
    })
    }catch(error){
      res.status(500).json({message:error.message})
    }
  }

  export const getAnalisis = async(req,res) => {
    try { 
      const {idComposicion} = req.params
      const pool = await getConexion();

      const analisis = await pool.request()
      .execute('getAnalisis')
      pool.close()

    return res.status(200).json({
      rol : rol,
      analisis: analisis.recordset,
    })
    } catch (error) {
      
    }
  }

  export const logout = (req,res) =>{
    res.clearCookie('token')
    res.clearCookie('grupo')
    res.clearCookie('almacen')
    res.sendStatus(200)

  
  }
