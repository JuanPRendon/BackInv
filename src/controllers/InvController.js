import {getConexion,sql} from "../database/conexion";
import {createToken} from '../libs/jwt'

<<<<<<< HEAD

export const loginUsuario = async(req,res) =>{
=======
  export const login = async(req,res) =>{
>>>>>>> ac400390c638a2400625ad33a4e8989c16260781
    const {user} = req.body
    try {
    const pool = await getConexion()
    const result = await pool.request()
      .input('user',sql.VarChar, user.user)
      .input('pass',sql.VarChar, user.pass)
<<<<<<< HEAD
      .execute('loginUsuario');
      pool.close();
      if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"});
      
      res.cookie("idUsuario",result.recordset[0].idUsuario);
      return res.status(200).json({message:"login"});
=======
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
      
>>>>>>> ac400390c638a2400625ad33a4e8989c16260781
    } catch (error) {
      res.status(500).json({message:error.message})
    }
}

<<<<<<< HEAD
export const getDocumento = async(req,res) =>{
  const {idDocumento} = req.params
  try {
    console.log(idDocumento);
    const pool = await getConexion();
    const result = await pool.request()
    .input('idDocumento',sql.Int, idDocumento)
    .execute('getDocumento')
    return res.status(200).json(result.recordset)
  } catch (error) {
    res.status(500).json({message:error.message})
=======
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

      const result = await pool.request()
      .input('idComposicion', sql.Int, idComposicion)
      .execute('getComposicion')
      pool.close()

    return res.status(200).json(result.recordset)
    } catch (error) {
      
    }
  }

  export const getRutas = async(req,res) => {
    try {
      const pool = await getConexion()

      const result = await pool.request()
      .execute('getRutas')
    pool.close()

    return res.json(result.recordset)
    } catch (error) {
      
    }
  }

  export const logout = (req,res) =>{
    res.clearCookie('token')
    res.clearCookie('grupo')
    res.clearCookie('almacen')
    res.sendStatus(200)

  
>>>>>>> ac400390c638a2400625ad33a4e8989c16260781
  }
}

export const getDocumentos = async(req,res) =>{
  try {
    const pool = await getConexion();
    const result = await pool.request()
    .execute('getDocumentos')
    return res.status(200).json(result.recordset)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const crearDocumento = async(req,res) =>{
  const {idUsuario} = req.cookies
  const fecha = new Date().toDateString();
  try {
    const pool = await getConexion();
    await pool.request()
      .input('fecha',sql.Date, fecha)
      .input('idUsuario',sql.Int, idUsuario)
      .execute('crearDocumento')

  return res.status(200).json({message:"Documento Creado"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  
}

