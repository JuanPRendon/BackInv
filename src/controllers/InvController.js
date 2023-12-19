import {getConexion,sql} from "../database/conexion";


  export const GetMateriales = async(req,res) => {
    try{
      const {almacen} = req.cookies
      const pool = await getConexion();
      const result = await pool.request()
        .input('almacen', sql.Int, almacen)
        .execute('getMateriales')
      res.json(result.recordset)
      pool.close(); 
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const getConteo = async(req,res) => {
    try{
      const {almacen,grupo} = req.cookies
      const pool = await getConexion();
      const result = await pool.request()
      .input('almacen', sql.Int , almacen)
      .input('grupo', sql.Int, grupo)
      .execute('getConteoGrupo')
      res.json(result.recordset)
      pool.close(); 
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const registroConteo = async(req,res) =>{
    const {almacen,grupo} = req.cookies
    const {material} = req.body
    const pool = await getConexion()

    const result = await pool.request()
    .input('material', sql.Int, material.material)
    .input('almacen', sql.Int, almacen)
    .input('grupo', sql.Int, grupo)
    .execute('validarConteo')

    if (result.recordset.length > 0) return res.status(406).json({message:"ya fue contado este material por tu grupo"})
    
    await pool
    .request()
    .input('material', sql.Int, material.material)
    .input('ubicacion', sql.VarChar, material.ubicacion)
    .input('numeroLote', sql.Int, material.numeroLote)
    .input('cantidad', sql.Int, material.cantidad)
    .input('almacen', sql.Int, almacen)
    .input('grupo', sql.Int, grupo)
    .execute('CrearConteo')
    pool.close();
    res.status(200).json({message:'insert'})
  }

  export const updateConteo = async(req,res) =>{
    try{
      const {idConteo} = req.body
      const pool = await getConexion();
      await pool.request()
      .input('idConteo', sql.Int , idConteo.idConteo)
      .input('ubicacion', sql.VarChar, idConteo.ubicacion)
      .input('numeroLote', sql.VarChar, idConteo.lote)
      .input('cantidad', sql.Int, idConteo.cantidad)
      .execute('updateConteo')
      pool.close();
      res.status(200).json({message:"Conteo Actualizado"})
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const deleteConteo = async(req,res) =>{
    try{
      const {id} = req.query
      const pool = await getConexion();
      await pool.request()
      .input('idConteo', sql.Int , id.id)
      .execute('DeleteConteo')
      pool.close();
      res.status(200).json({message:"Conteo Eliminado"})
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const getGrupo =async(req,res) => {
    try{
      const pool = await getConexion();
      if (req.path === '/grupo'){
        const result = await pool.request()
        .query(`select * from grupo`)
        res.json(result.recordset)

      }else if(req.path === '/loginGrupo'){
        const result = await pool.request()
        .query(`select idGrupo as 'value', nombre as 'label' from grupo`)
        res.json(result.recordset)
      }
      pool.close();
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const registroGrupo = async(req,res) => {
    try {
        const {usuario} = req.body
        const pool = await getConexion();
        await pool
        .request()
        .input('nombre',sql.VarChar, usuario.usuario)
        .input('contraseña',sql.VarChar, usuario.pass)
        .input('almacen',sql.Int, usuario.almacen)
        .input('conteo',sql.Int, usuario.conteo)
        .execute('createGrupo')
        pool.close()
        res.status(200).json({message:"grupo creado"})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  export const updateGrupo = async(req,res) => {
    try{
      //const {idConteo} = req.body
      console.log(req.body);
      // const pool = await getConexion();
      // await pool.request()
      // .input('idConteo', sql.Int , idConteo.idConteo)
      // .input('ubicacion', sql.VarChar, idConteo.ubicacion)
      // .input('numeroLote', sql.VarChar, idConteo.lote)
      // .input('cantidad', sql.Int, idConteo.cantidad)
      // .execute('updateConteo')
      // pool.close();
      res.status(200).json({message:"Grupo Actualizado"})
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  export const deleteGrupo = async(req,res) => {
    try{
      const {id} = req.query
      console.log(id);
      const pool = await getConexion();
      const result = await pool.request()
      .input('idGrupo', sql.Int , id.id)
      .execute('deleteGrupo')
      pool.close();
      res.json(result)
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }  
  }
  
  export const loginGrupo = async(req,res) => {
    const {grupo} = req.body
    try {
        const pool = await getConexion();
       const result = await pool.request()
        .input('grupo',sql.VarChar, grupo.grupo)
        .input('pass',sql.Int, grupo.pass)
        .execute('validateLogin')
        pool.close()
        if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})
        res.cookie('grupo',result.recordset[0].idGrupo)
        res.cookie('almacen',result.recordset[0].almacen)
        return res.status(200).json({message:"login"})
        
        // const token = await createToken({id:nombreGrupo})
        // res.cookie('token',token);
        //   res.json({
        //     message:"Login Grupo"
        //   })
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  export const loginUser = async(req,res) =>{
    const {user} = req.body
    try {
      const pool = await getConexion();
     const result = await pool.request()
      .input('user',sql.VarChar, user.user)
      .input('pass',sql.VarChar, user.pass)
      .execute('validateLoginUser')
      pool.close()
      if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})
      return res.status(200).json({message:"login"})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  export const logout = (req,res) =>{
    res.clearCookie('token')
    res.clearCookie('grupo')
    res.clearCookie('almacen')
    res.sendStatus(200)
  }
