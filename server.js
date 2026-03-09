import app from "./app.js";

let port = process.env.PORT || 3100;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
