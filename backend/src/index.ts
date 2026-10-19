import { ENV } from "./config/env.js";
import app from "./server.js";


app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});