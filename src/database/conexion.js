import sql from "mssql";

const dbSettings = {
    user: 'sa' ,
    password: 'S3rv1c10st1c*' ,
    server: '192.168.1.9\\BBI' ,
    database : 'inventarios' ,

    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}


export async function getConexion(){
    try{
    const pool = await sql.connect(dbSettings);
    return pool;
    } catch(error){
        console.log(error);
    }
}

export {sql}