// Server Listen Init
import app from "./src/app/app.js";

let PORT = process.env.PORT || 12345;

app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});