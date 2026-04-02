import { Provider } from "./components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Import Poppins weights
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import './index.css'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)