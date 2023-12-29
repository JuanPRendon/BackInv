import { getConexion, sql } from "../database/conexion";
const fs = require('fs');

async function registroMateriales(filePath) {
  try {;
    const pool = await getConexion();

    const table = new sql.Table('materiales1');
    table.create = false;
    table.columns.add('idMaterial', sql.Int),{nullable: true};
    table.columns.add('nombre', sql.VarChar(40)),{nullable: true};
    table.columns.add('cantidad', sql.Int),{nullable: true}
    table.columns.add('almacen', sql.Int),{nullable: true}

    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.split('\n');
    rows.forEach((row) => {
      const values = row.split(';');
      table.rows.add(parseInt(values[0]), values[1], parseInt(values[2]),parseInt(values[3]));
    });
    const result = pool.request();
    console.log(table)
    await result.bulk(table)
    await pool.close();
  } catch (error) {
    console.error('Error al realizar bulk insert:',error.code +" a "+error.message);
  }
}

export default registroMateriales