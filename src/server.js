// server.js

import app from "./app.js";
const port = 5000 
// server
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
