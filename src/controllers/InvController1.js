// import {getConexion,sql} from "../database/conexion";

//   export const getMateriales = async(req,res) => {
//   try{
//     const pool = await getConexion();
//     const result = await pool.request()
//     .query(`select * from materiales`)
//     res.json(result.recordset)
//     pool.close(); 
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
//   }

//   export const GetMaterialesConteo = async(req,res) => {
//     try{
//       const {grupo} = req.cookies
//       const pool = await getConexion();
//       const result = await pool.request()
//         .input('grupo', sql.Int, grupo)
//         .execute('getMateriales')
//       res.json(result.recordset)
//       pool.close(); 
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const getMaterialesDoc = async(req,res) =>{
//     try{
     
//       const pool = await getConexion();
//       const result = await pool.request()
//       .query(`select CAST(CONCAT(idMaterial,almacen) AS int) as 'value',CONCAT(nombre,almacen) as 'label'from materiales`)
//       res.json(result.recordset)
//       pool.close(); 
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const recuento = async(req,res) => {
//     try{
//       const pool = await getConexion();
//       const result = await pool.request()
//         .execute('recuento')
//       pool.close();
//       // Objeto para almacenar los datos transformados
//       const transformedData = {};
      
//       // Iterar sobre los datos originales y agrupar por material y almacen
//       result.recordset.forEach((item) => {
//         const key = `${item.material}_${item.almacen}_${item.sap}`;
//         if (!transformedData[key]) {
//           transformedData[key] = {
//             documento : item.idDocumento,
//             material: item.material,
//             almacen: item.almacen,
//             sap: item.sap,
//             [`conteo${item.conteo}`]: item.cantidad,
//             [`diferencia${item.conteo}`]: item.cantidad - item.sap,
//           };
//         } else {
//           transformedData[key][`conteo${item.conteo}`] = item.cantidad;
//           transformedData[key][`diferencia${item.conteo}`] = item.cantidad - item.sap;
//         }
//       });
//       const ultData = Object.values(transformedData)
//       res.json(ultData)
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const getConteo = async(req,res) => {
//     try{
//       const {almacen,grupo} = req.cookies
//       const pool = await getConexion();
//       const result = await pool.request()
//       .input('almacen', sql.Int , almacen)
//       .input('grupo', sql.Int, grupo)
//       .execute('getConteoGrupo')
//       res.json(result.recordset)
//       pool.close(); 
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const registroConteo = async(req,res) =>{
//     const fechaHoraActual = new Date();
//     const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const fechaLocal = fechaHoraActual.toLocaleDateString('es-ES', opcionesFecha);

//     const {almacen,grupo} = req.cookies
//     const {material} = req.body
//     const pool = await getConexion()

//     const result = await pool.request()
//     .input('material', sql.Int, material.material)
//     .input('almacen', sql.Int, almacen)
//     .input('grupo', sql.Int, grupo)
//     .execute('validarConteo')

//     if (result.recordset.length > 0) return res.status(406).json({message:"ya fue contado este material por tu grupo"})
    
//     await pool
//     .request()
//     .input('fecha', sql.Date, fechaLocal)
//     .input('material', sql.Int, material.material)
//     .input('almacen', sql.Int, almacen)
//     .input('ubicacion', sql.VarChar, material.ubicacion)
//     .input('numeroLote', sql.Int, material.numeroLote)
//     .input('cantidad', sql.Int, material.cantidad)
//     .input('grupo', sql.Int, grupo)
//     .execute('CrearConteo')
//     pool.close();
//     res.status(200).json({message:'insert'})
//   }

//   export const updateConteo = async(req,res) =>{
//     try{
//       const {idConteo} = req.body
//       const pool = await getConexion();
//       await pool.request()
//       .input('idConteo', sql.Int , idConteo.idConteo)
//       .input('ubicacion', sql.VarChar, idConteo.ubicacion)
//       .input('numeroLote', sql.VarChar, idConteo.lote)
//       .input('cantidad', sql.Int, idConteo.cantidad)
//       .execute('updateConteo')
//       pool.close();
//       res.status(200).json({message:"Conteo Actualizado"})
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const deleteConteo = async(req,res) =>{
//     try{
//       const {id} = req.query
//       const pool = await getConexion();
//       await pool.request()
//       .input('idConteo', sql.Int , id.id)
//       .execute('DeleteConteo')
//       pool.close();
//       res.status(200).json({message:"Conteo Eliminado"})
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

  
//   export const getGrupo =async(req,res) => {
//     try{
//       const pool = await getConexion();
//       if (req.path === '/grupo'){
//         const result = await pool.request()
//         .query(`select * from grupo`)
//         res.json(result.recordset)

//       }else if(req.path === '/loginGrupo'){
//         const result = await pool.request()
//         .query(`select idGrupo as 'value', nombre as 'label' from grupo`)
//         res.json(result.recordset)
//       }
//       pool.close();
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const registroGrupo = async(req,res) => {
//     try {
//         const {grupo} = req.body
//         const pool = await getConexion();
//         await pool
//         .request()
//         .input('nombre',sql.VarChar, grupo.grupo)
//         .input('contraseña',sql.Int, grupo.pass)
//         .input('almacen',sql.Int, grupo.almacen)
//         .input('conteo',sql.Int, grupo.conteo)
//         .execute('createGrupo')
//         pool.close()
//         res.status(200).json({message:"grupo creado"})
//     } catch (error) {
//       res.status(500).json({message:error.message})
//     }
//   }

//   export const updateGrupo = async(req,res) => {
//     try{
//       const {idGrupo} = req.body
//       const pool = await getConexion();
//       await pool.request()
//       .input('idGrupo', sql.Int , idGrupo.idGrupo)
//       .input('usuario', sql.VarChar, idGrupo.usuario)
//       .input('pass', sql.Int, idGrupo.pass)
//       .input('almacen', sql.Int, idGrupo.almacen)
//       .input('conteo', sql.Int, idGrupo.conteo)
//       .execute('updateGrupo')
//       pool.close();
//       res.status(200).json({message:"Grupo Actualizado"})
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const deleteGrupo = async(req,res) => {
//     try{
//       const {id} = req.query
//       console.log(id);
//       const pool = await getConexion();
//       const result = await pool.request()
//       .input('idGrupo', sql.Int , id.id)
//       .execute('deleteGrupo')
//       pool.close();
//       res.json(result)
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }  
//   }
  
//   export const loginGrupo = async(req,res) => {
//     const {grupo} = req.body
//     console.log(grupo);
//     try {
//         const pool = await getConexion();
//        const result = await pool.request()
//         .input('grupo',sql.VarChar, grupo.grupo)
//         .input('pass',sql.Int, grupo.pass)
//         .execute('validateLogin')
//         pool.close()
//         if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})
//         res.cookie('grupo',result.recordset[0].idGrupo)
//         res.cookie('almacen',result.recordset[0].almacen)
//         return res.status(200).json({message:"login"})
        
//         // const token = await createToken({id:grupo.grupo})
//         // res.cookie('token',token);
//         //   res.json({
//         //     message:"Login Grupo"
//         //   })
//     } catch (error) {
//       res.status(500).json({message:error.message})
//     }
//   }

//   export const getUsuario =async(req,res) => {
//     try{
//       const pool = await getConexion();
//       const result = await pool.request()
//       .query(`select * from usuario`)
//       res.json(result.recordset)
//       pool.close(); 
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const registroUsuario = async(req,res) => {
//     try {
//         const {user} = req.body
//         const pool = await getConexion();
//         await pool
//         .request()
//         .input('nombre',sql.VarChar, user.usuario)
//         .input('contraseña',sql.VarChar, user.pass)
//         .execute('crearUsuario')
//         pool.close()
//         res.status(200).json({message:"Usuario creado"})
//     } catch (error) {
//       res.status(500).json({message:error.message})
//     }
//   }

//   export const updateUsuario = async(req,res) => {
//     try{
//       const {idUser} = req.body
//       const pool = await getConexion();
//       await pool.request()
//       .input('idUser', sql.Int , idUser.idUser)
//       .input('usuario', sql.VarChar, idUser.user)
//       .input('pass', sql.Int, idUser.pass)
//       .execute('updateUser')
//       pool.close();
//       res.status(200).json({message:"Grupo Actualizado"})
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }
//   }

//   export const deleteUsuario = async(req,res) => {
//     try{
//       const {id} = req.query
//       console.log(req.query);
//       const pool = await getConexion();
//       const result = await pool.request()
//       .input('idUser', sql.Int , id.id)
//       .execute('deleteUser')
//       pool.close();
//       res.json(result)
//     } catch (error) {
//       res.status(500);
//       res.send(error.message);
//     }  
//   }

//   export const loginUser = async(req,res) =>{
//     const {user} = req.body
//     try {
//       const pool = await getConexion();
//      const result = await pool.request()
//       .input('user',sql.VarChar, user.user)
//       .input('pass',sql.VarChar, user.pass)
//       .execute('validateLoginUser')
//       pool.close()
//       if(result.recordset.length === 0) return res.status(400).json({message:"El usuario no existe"})
//       return res.status(200).json({message:"login"})
//     } catch (error) {
//       res.status(500).json({message:error.message})
//     }
//   }

//   export const logout = (req,res) =>{
//     res.clearCookie('token')
//     res.clearCookie('grupo')
//     res.clearCookie('almacen')
//     res.sendStatus(200)
//   }
