import { app } from "./app.js";
import { config } from "./config/config.js";

app.listen(config.port, () => {
  console.log(`pinavg is listening on port ${config.port}!`);
});
