import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Homepage from "./components/home/HomePage";
import MorcGame from "./pages/games/MorcGame";
import KartContext from "./pages/games/KartContext";
import NumberGuess from "./pages/games/NumberGuess";
import Cointransfer from "./pages/bottompage/cointransfer";
import Social from "./pages/bottompage/Social";
import Top from "./pages/bottompage/top";
import FootballPredictionSystem from "./components/footbal/FootballPredictionSystem";
import Page4 from "./pages/page4/page4";
import Footer2 from "./layout/Footer2";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path="games/morc" element={<MorcGame />} />
              <Route path="games/number-guess" element={<NumberGuess />} />
              <Route path="games/kart-context" element={<KartContext />} />
              <Route path="page4" element={<Page4 />} />
              <Route
                path="bottompage/football"
                element={<FootballPredictionSystem />}
              />
              <Route
                path="bottompage/cointransfer"
                element={<Cointransfer />}
              />
              <Route path="bottompage/Social" element={<Social />} />
              <Route path="bottompage/top" element={<Top />} />
            </Route>
          </Routes>
        </div>
        {/* ✅ فوتر اینجا اضافه شد تا همیشه در تمام صفحات باشد */}
        <Footer2 />
      </div>
    </BrowserRouter>
  );
};

export default App;
