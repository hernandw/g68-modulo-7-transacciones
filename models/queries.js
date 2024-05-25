import pool from "../config/db.js";

const transacciones = async () => {
  try {
    await pool.query("BEGIN");

    //1 paso
    const descuentousuario =
      "update usuarios set saldo = saldo - 5000 where email= 'alejandra@gmail.com' returning *";
    const descontar = await pool.query(descuentousuario);
    //2do paso

    const depositousuario =
      "update usuarios set saldo = saldo + 5000 where email= 'calbares@gmail.com' returning *";
    const depositar = await pool.query(depositousuario);

    await pool.query("COMMIT");
    console.log('El descuesto fue exitoso', descontar.rows[0] );
    console.log('El deposito fue exitoso', depositar.rows[0] );
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error.message);
    console.log("**Transaccion no realizada**");
  }
};


transacciones()