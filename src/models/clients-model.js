const db = require("../database");

const saveClient = async (req, res) => {
  const { id, identification, client, phone, direction } = req.body;

  const newClient = {
    id,
    identification,
    client,
    phone,
    direction,
  };

  db.query("INSERT INTO clients set ?", [newClient], (err, clientStored) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el proveedor" });

    if (!clientStored)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el proveedor" });

    return res.status(201).send({
      respuesta: "El proveedor se registro correctamente",
    });
  });
};

const getClients = async (req, res) => {
  db.query("SELECT * FROM clients WHERE state = 1 ORDER BY client ASC", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar los clientes" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen clientes registrados" });

    return res.status(200).send({
      clients: rows,
    });
  });
};

const deleteClient = async (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM clients WHERE id = ?",[id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el cliente" });

      return res.status(200).send({
        res: "cliente eliminado correctamente",
      });
    }
  );
};

const updateClient = async (req, res) => {

  const id = req.params.id;  
  const { identification, client, phone, direction } = req.body;


  db.query(
    "UPDATE clients SET identification = ?, client = ?, phone = ?, direction = ?  WHERE id = ?",[identification, client, phone, direction, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el cliente" });

      return res.status(200).send({
        res: "cliente actualizado correctamente",
      });
    }
  );
};



const inactivateClient = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE clients SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el cliente" });

      return res.status(200).send({
        res: "El cliente se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveClient,
  getClients,
  deleteClient,
  updateClient,
  inactivateClient
};
