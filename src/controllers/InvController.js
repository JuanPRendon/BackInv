import {getConexion,sql} from "../database/conexion";


export const loginUsuario = async(req,res) =>{
    const {user} = req.body
    try {
      const pool = await getConexion();
     const result = await pool.request()
      .input('user',sql.VarChar, user.user)
      .input('pass',sql.VarChar, user.pass)
      .execute('loginUsuario');
      pool.close();
      if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"});
      
      res.cookie("idUsuario",result.recordset[0].idUsuario);
      return res.status(200).json({message:"login"});
    } catch (error) {
      res.status(500).json({message:error.message})
    }
}

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

