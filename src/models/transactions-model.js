const db = require("../database");

/* Funciones modulo de compras */

const saveShopping = async (req, res) => {
  
  db.query("INSERT INTO shopping (id, invoice_number, product_id, supplier_id, unit_value, quantity, total_value, payable_id, date) VALUES ?", [req.body.data], (err, shoppingStored) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar la compra" });

    if (!shoppingStored)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar la compra" });

    return res.status(201).send({
      respuesta: "La compra se registro correctamente",
    });
  });

  addInventory(req.body.data2)
  req.body.payable && savePayable(req.body.data3)
};

const getShopping = async (req, res) => {
  db.query("SELECT s.id, p.detail, sp.supplier, s.quantity, s.unit_value, total_value, DATE_FORMAT(s.date, '%Y-%m-%d') AS date FROM shopping s, products p, suppliers sp WHERE s.product_id = p.id AND s.supplier_id = sp.id ORDER BY s.register_date DESC", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar las compras" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen compras registradas" });

    return res.status(200).send({
      shopping: rows,
    });
  });
};

const getReceivables = async (req, res) => {
  db.query("SELECT p.id, s.supplier, DATE_FORMAT(p.date, '%Y-%m-%d') AS date, SUM(sh.total_value) AS total_shopping, (SELECT COALESCE(SUM(pp.value), 0) FROM payments_payable pp WHERE pp.payable_id = p.id) AS total_payments FROM suppliers s, payable p, shopping sh WHERE s.id = p.supplier_id AND p.id = sh.payable_id AND p.state = 1 GROUP BY p.id", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar las compras" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen compras registradas" });

    return res.status(200).send({
      receivables: rows,
    });
  });
};

const getPayables = async (req, res) => {
  db.query("SELECT p.id, s.supplier, DATE_FORMAT(p.date, '%Y-%m-%d') AS date, SUM(sh.total_value) AS total_shopping, (SELECT COALESCE(SUM(pp.value), 0) FROM payments_payable pp WHERE pp.payable_id = p.id) AS total_payments FROM suppliers s, payable p, shopping sh WHERE s.id = p.supplier_id AND p.id = sh.payable_id AND p.state = 1 GROUP BY p.id", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar las compras" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen compras registradas" });

    return res.status(200).send({
      payables: rows,
    });
  });
};

const getIncomeExpenses = async (req, res) => {

  const date1 = req.params.date1;
  const date2 = req.params.date2;

  db.query("SELECT (SELECT COALESCE(SUM(s.quantity * s.sale_value), 0) FROM sales s WHERE s.date BETWEEN ? AND ?) AS total_sale, (SELECT COALESCE(SUM(sh.total_value), 0) FROM shopping sh WHERE sh.date BETWEEN ? AND ?) AS total_shopping", [date1, date2, date1, date2], (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al realizar la consulta" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen datos para esta consulta" });

    return res.status(200).send({
      state: rows,
    });
  });
};

const getUtilities = async (req, res) => {

  const date1 = req.params.date1;
  const date2 = req.params.date2;

  db.query("SELECT p.detail, (SELECT COALESCE(SUM(s.quantity * s.sale_value), 0) FROM sales s WHERE s.date BETWEEN ? AND ? AND s.product_id = p.id) AS total_sale, (SELECT COALESCE(SUM(sh.total_value), 0) FROM shopping sh WHERE sh.date BETWEEN ? AND ? AND sh.product_id = p.id) AS total_shopping FROM products p WHERE p.state = 1", [date1, date2, date1, date2], (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al realizar la consulta" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen datos para esta consulta" });

    return res.status(200).send({
      utilities: rows,
    });
  });
};

const updateShopping = async (req, res) => {

  const id = req.params.id;  
  const { quantity, total_value, unit_value, date } = req.body;


  db.query(
    "UPDATE shopping SET quantity = ?, total_value = ?, unit_value = ?, date = ?  WHERE id = ?",[quantity, total_value, unit_value, date, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar la compra" });

      return res.status(200).send({
        res: "La compra se actualizo correctamente",
      });
    }
  );
};

const inactivateShopping = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE shopping SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar la compra" });

      return res.status(200).send({
        res: "La compra se elimino correctamente",
      });
    }
  );
};

/* Funciones modulo de ventas */

const saveSale = async (req, res) => {

  db.query("INSERT INTO sales (id, product_id, quantity, sale_value, date, receivable_id) VALUES (?)", [req.body.data], (err, saleStored) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar la venta" });

    if (!saleStored)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar la venta" });

    return res.status(201).send({
      respuesta: "La venta se registro correctamente",
    });
  });

  subtractInventory(req.body.data2)
  req.body.receivable && saveReceivable(req.body.data3)

};

const savePaidReceivable = async (req, res) => {
  const { id, receivable_id, value, balance, date } = req.body;

  const newPaid = {
    id,
    receivable_id,
    value: value,
    date,
  };

  db.query("INSERT INTO payments_receivable set ?", [newPaid], (err, newPaid) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el abono." });

    if (!newPaid)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el abono" });

    return res.status(201).send({
      respuesta: "El abono se registro correctamente",
    });
  });

  if(parseInt(value) === parseInt(balance)) {
    inactivateReceivable(receivable_id);
  } 
};

const savePaidPayable = async (req, res) => {
  const { id, payable_id, value, balance, date } = req.body;

  const newPaid = {
    id,
    payable_id,
    value: value,
    date,
  };

  db.query("INSERT INTO payments_payable set ?", [newPaid], (err, newPaid) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el abono." });

    if (!newPaid)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el abono" });

    return res.status(201).send({
      respuesta: "El abono se registro correctamente",
    });
  });

  if(parseInt(value) === parseInt(balance)) {
    inactivatePayable(payable_id);
  } 
};

const inactivateReceivable = async (payable_id) => {

  const state = 0;

  db.query(
    "UPDATE receivable SET state = ?  WHERE id = ?",[state, payable_id],
    (err, rows) => {
      if (err)
        console.log("Error al actualizar el estado de la cuenta");
    }
  );
};

const inactivatePayable = async (payable_id) => {

  const state = 0;

  db.query(
    "UPDATE payable SET state = ?  WHERE id = ?",[state, payable_id],
    (err, rows) => {
      if (err)
        console.log("Error al actualizar el estado de la cuenta");
    }
  );
};

const saveReceivable = (data) => {

  const { id, client_id, date } = data;

  const dataReceivable = {
    id, 
    client_id,
    date
  }

  db.query("INSERT INTO receivable set ?", [dataReceivable], (err, receivableStored) => {
    if (err)
      console.log("Error al guardar la cuenta por cobrar");

    if (!receivableStored)
      console.log("No se ha podido guardar la cuenta por cobrar");

      console.log("La cuenta por cobrar se registro correctamente");
  });
}

const savePayable = (data) => {

  const { id, supplier_id, date } = data;

  const dataPayable = {
    id, 
    supplier_id,
    date
  }

  db.query("INSERT INTO payable set ?", [dataPayable], (err, payableStored) => {
    if (err)
      console.log("Error al guardar la cuenta por pagar");

    if (!payableStored)
      console.log("No se ha podido guardar la cuenta por pagar");

      console.log("La cuenta por pagar se registro correctamente");
  });
}

const getSales = async (req, res) => {
  db.query("SELECT s.id, p.detail, s.quantity, s.sale_value, DATE_FORMAT(s.date, '%Y-%m-%d') AS date FROM sales s, products p WHERE s.product_id = p.id AND s.state = 1 ORDER BY s.register_date DESC", (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al consultar las ventas" });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen ventas registradas" });

    return res.status(200).send({
      shopping: rows,
    });
  });
};

const updateSale = async (req, res) => {

  const id = req.params.id;  
  const { quantity, date } = req.body;


  db.query(
    "UPDATE sale SET quantity = ?, date = ?  WHERE id = ?",[quantity, date, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar la compra" });

      return res.status(200).send({
        res: "La compra se actualizo correctamente",
      });
    }
  );
};

const inactivateSale = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE sales SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar la venta" });

      return res.status(200).send({
        res: "La venta se elimino correctamente",
      });
    }
  );
};

const subtractInventory = (data) => {
  data.forEach((item) => { 

    db.query(
      "UPDATE products SET existence = existence - ?  WHERE id = ?",[item.quantity, item.product_id],
      (err, rows) => {
        if (err)
          console.log("Error al actualizar la existencia");
      }
    );
    
  });
};

const addInventory = (data) => {
  data.forEach((item) => { 

    db.query(
      "UPDATE products SET existence = existence + ?  WHERE id = ?",[item.quantity, item.product_id],
      (err, rows) => {
        if (err)
          console.log("Error al actualizar la existencia");
      }
    );
    
  });
};

const updateExistence = (quantity, product_id) => {

    db.query(
      "UPDATE products SET existence = existence + ?  WHERE id = ?",[quantity, product_id],
      (err, rows) => {
        if (err)
          console.log("Error al actualizar la existencia");
      }
    );

};

module.exports = {
  saveShopping,
  getShopping,
  updateShopping,
  inactivateShopping, 
  saveSale,
  getSales,
  updateSale,
  inactivateSale,
  getIncomeExpenses,
  getUtilities,
  getReceivables,
  savePaidReceivable,
  getPayables,
  savePaidPayable,
};
