import pool from "../configs/db.js";

let products = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset],
    );

    res.json({
      status: true,
      message: "Successfully selected",
      page,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

let createProduct = async (req, res, next) => {
  try {
    let { title, description, price, category, stock } = req.body;
    let newProduct = await pool.query(
      "insert into products(title,description,price,category,stock) values($1,$2,$3,$4,$5)",
      [title, description, price, category, stock],
    );
    res.json({
      status: true,
      message: "succusfully created",
    });
  } catch (error) {
    next(error);
  }
};

let selectById = async (req, res, next) => {
  try {
    let products = await pool.query("select * from products where id=$1", [
      req.params.id,
    ]);
    if (products.rows.length === 0) throw new Error("product topilmadi");
    console.log(products.rows);
    res.json({
      status: true,
      message: "succusfully sellect",
      data: products.rows,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET title = $1, description = $2, price = $3, category = $4, stock = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, price, category, stock, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product topilmadi" });
    }

    res.json({
      status: true,
      message: "Product  yangilandi",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

let deleteProduct = (req, res, next) => {
  try {
    let id = req.params.id;
    let deleteProduct = pool.query("delete from products where id=$1", [id]);
    res.json({
      status: true,
      message: "product ochirildi",
    });
  } catch (error) {
    next(error);
  }
};

export { products, createProduct, selectById, updateProduct, deleteProduct };
