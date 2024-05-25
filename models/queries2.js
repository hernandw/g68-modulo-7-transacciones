import pool from "../config/db.js";

const transacciones = async () => {
  try {
    await pool.query("BEGIN");
    const descuentousuario =
      "update usuarios set saldo = saldo - 5000 where email= 'jbutt@gmail.com' returning *";
    const descontar = await pool.query(descuentousuario);
    if (descontar.rowCount > 0) {
      console.log("El descuesto fue exitoso", descontar.rows[0]);
    } else {
      console.log("El descuesto no se pudo realizar");
      console.log("El usuario no existe");
      await pool.query("ROLLBACK");
    }

    const depositousuario =
      "update usuarios set saldo = saldo + 5000 where email= 'calbares@gmail.com' returning *";
    const depositar = await pool.query(depositousuario);
    if (depositar.rowCount > 0) {
      console.log("El deposito fue exitoso", depositar.rows[0]);
      await pool.query("COMMIT");
    } else {
      console.log("El deposito no se pudo realizar");
      console.log("El usuario no existe");
      await pool.query("ROLLBACK");
    }
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log("Error conexion o instruccion, Transaccion abortada");
  }
};


transacciones()