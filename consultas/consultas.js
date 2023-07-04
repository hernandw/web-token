const pool = require("../db/conexion");

const getUser = async (req, res) => {
  const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
  return usuarios;
};

const verificarCredencial = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
  const values = [email, password];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) {
    throw {
      code: 404,
      message: "No se encontró el usuario con estas credenciales",
    };
  }
 
};

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
  next();
};



module.exports = {
  getUser,
  verificarCredencial,
  ensureToken,
};
