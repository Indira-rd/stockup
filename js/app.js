import router from "./routes.js";
import themeSwitcher from "./lib/theme-switcher.js";
import mockServer from "./api/pantry.mock.server.js";

router.start();

mockServer();

function initializeApp() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", initializeApp);
