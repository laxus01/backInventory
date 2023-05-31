const db = require("../database");

const saveProduct = async (req, res) => {
  const { id, detail, sale_value, existence, barcode  } = req.body;
  const register_date = null;

  const newProduct = {
    id,
    detail,
    sale_value,
    existence,
    barcode,
    register_date,
  };

  console.log(newProduct);

  db.query(
    "INSERT INTO products set ?",
    [newProduct],
    (err, productsStored) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el producto." });

      if (!productsStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el producto" });

      return res.status(201).send({
        respuesta: "El producto se registro correctamente",
      });
    }
  );
};

const getProducts = async (req, res) => {
  db.query(
    "SELECT id, detail, barcode, sale_value, existence FROM products WHERE state = '1' ORDER BY detail ASC",
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar los productos." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen productos registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const deletePayment = async (req, res) => {

  const id = req.params.id;

  await db.query(
    "DELETE FROM payments WHERE id = ?",[id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el cobros." });

      return res.status(200).send({
        res: "Cobro eliminado correctamente",
      });
    }
  );
};

const updateProduct = async (req, res) => {

  const id = req.params.id;  
  const { detail, sale_value, existence, barcode } = req.body;


  db.query(
    "UPDATE products SET detail = ?, sale_value = ?, existence = ?, barcode = ?  WHERE id = ?",[detail, sale_value, existence, barcode, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el producto." });

      return res.status(200).send({
        res: "Producto actualizado correctamente",
      });
    }
  );
};



const inactivateProduct = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE products SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el producto." });

      return res.status(200).send({
        res: "El producto se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveProduct,
  getProducts,
  deletePayment,
  updateProduct,
  inactivateProduct,
};