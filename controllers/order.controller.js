import pool from "../configs/db.js";

let createOrder = (req, res, next) => {
  let { user_id, total_price, status } = req.body;
  let newOrder = pool.query(
    "insert into orders(user_id, total_price, status) values($1,$2,$3)",
    [user_id, total_price, status],
  );
  res.status(201).json({
    status: true,
    message: "succesfully created",
  });
};

let getAllOrders = async (req, res, next) => {
  let orders = await pool.query(`SELECT 
        u.name,
        u.email,
        o.id AS order_id,
        o.total_price,
        o.status,
        o.created_at
      FROM orders o
      INNER JOIN users u ON o.user_id = u.id
      `);
  orders = orders.rows;
  res.json({ orders });
};

let getOrderById = async (req, res, next) => {
  let order = await pool.query("select * from orders where user_id=$1", [
    parseInt(req.params.id),
  ]);
  res.json({
    status: true,
    message: "succesfully sellected",
    orders: order.rows,
  });
};

let updateStatus = async (req, res, next) => {
  let { status } = req.body;
  let id = parseInt(req.params.id);
  let order = await pool.query("update orders set status=$1 where id=$2", [
    status,
    id,
  ]);
  res.json({ status: true, message: "succesfully updated" });
};

export { getAllOrders, createOrder, getOrderById, updateStatus };
