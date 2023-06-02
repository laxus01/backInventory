const db = require("../database");

const saveProduct = async (req, res) => {
  const { id, detail, sale_value, existence, barcode  } = req.body;
  const register_date = null;

  db.query(
    "INSERT INTO products (id, detail, sale_value, existence, register_date) VALUES (?, ?, ?, ?, ?)", [id, detail, sale_value, existence, register_date],
    (err, productsStored) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el producto." });

      if (!productsStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el producto" });

      saveBarcode(barcode, id)
      return res.status(201).send({
        respuesta: "El producto se registro correctamente",
      });
    }
  );
};

const saveNewBarcode = async (req, res) => {
  const { product_id, barcode  } = req.body;

  db.query(
    "INSERT INTO all_barcode (product_id, barcode) VALUES (?, ?)", [product_id, barcode], (err, barcodeStored) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el codigo de barra." });

      if (!barcodeStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el codigo de barra" });

      return res.status(201).send({
        respuesta: "El codigo de barra se registro correctamente",
      });
    }
  );

  const newProduct = {
    id,
    detail,
    sale_value,
    existence,
    register_date,
  };

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

      saveBarcode(barcode, id)
      return res.status(201).send({
        respuesta: "El producto se registro correctamente",
      });
    }
  );
};

const saveBarcode = async (barcode, product_id) => {

  db.query(
    "INSERT INTO all_barcode (product_id, barcode) VALUES (?, ?)", [product_id, barcode], (err, barcodeStored) => {
      if (err)
        return console.log(err);

      if (!barcodeStored)
        return console.log("No se ha podido guardar el codigo de barra");

        return console.log("El codigo de barra se registro correctamente");
    }
  );
};

const getProducts = async (req, res) => {
  db.query(
    "SELECT id, detail, sale_value, existence FROM products WHERE state = '1' ORDER BY detail ASC",
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

const getProductsByBarcode = async (req, res) => {

  const barcode = req.params.barcode;  

  console.log(barcode);

  db.query(
    "SELECT p.id, p.detail, p.sale_value, p.existence FROM products p, all_barcode a WHERE a.product_id = p.id AND p.state = '1' AND a.barcode = ? LIMIT 1", [barcode],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el producto." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen este producto" });

      return res.status(200).send({
        products: rows,
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
  getProductsByBarcode,
  saveNewBarcode,
};