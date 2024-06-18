import * as appconfig from "../appconfig.js";
import { app } from "./server";

app.listen(appconfig.backendPort(), () => {
	console.log(`---
APP: ${appconfig.appIdCode()}
FRONTEND URL: http://localhost:${appconfig.frontendPort()}
BACKEND URL: http://localhost:${appconfig.backendPort()}
BACKEND APP DATA: http://localhost:${appconfig.backendPort()}/appdata
`);
});