const db = require("../database");

const saveSupplier = async (req, res) => {
  const { id, nit, supplier, phone, direction } = req.body;

  const newSupplier = {
    id,
    nit,
    supplier,
    phone,
    direction,
  };

  db.query("INSERT INTO suppliers set ?", [newSupplier], (err, suppliersStored) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el proveedor" });

    if (!suppliersStored)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el proveedor" });

    return res.status(201).send({
      respuesta: "El proveedor se registro correctamente",
    });
  });
};

const getSuppliers = async (req, res) => {
  db.query("SELECT * FROM suppliers WHERE state = 1 ORDER BY supplier ASC", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar los proveedores" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen proveedores registrados" });

    return res.status(200).send({
      suppliers: rows,
    });
  });
};

const deleteSupplier = async (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM suppliers WHERE id = ?",[id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el proveedor" });

      return res.status(200).send({
        res: "proveedor eliminado correctamente",
      });
    }
  );
};

const updateSupplier = async (req, res) => {

  const id = req.params.id;  
  const { nit, supplier, phone, direction } = req.body;


  db.query(
    "UPDATE suppliers SET nit = ?, supplier = ?, phone = ?, direction = ?  WHERE id = ?",[nit, supplier, phone, direction, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el proveedor" });

      return res.status(200).send({
        res: "proveedor actualizado correctamente",
      });
    }
  );
};



const inactivateSupplier = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE suppliers SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el proveedor" });

      return res.status(200).send({
        res: "El proveedor se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  inactivateSupplier
};
