import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";

import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Heatmap from "./pages/Heatmap";
import Alerts from "./pages/Alerts";
import Government from "./pages/Government";
import DataSources from "./pages/DataSources";
import AIModel from "./pages/AIModel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/government" element={<Government />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/ai-model" element={<AIModel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;