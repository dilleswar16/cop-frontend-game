import "./App.css";
import LandingPage from "./components/landing-page/LandingPage";
import Buttons from "./components/button/Buttons";
import { AppProvider } from "./components/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="">
      <AppProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route exact path="/game" element={<Buttons />} />
            
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
