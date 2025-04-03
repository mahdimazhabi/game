import { useState, useEffect } from "react";
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
import Card from "./components/card/Card";
import FootballTeamFormation from "./components/footbal/FootballTeamFormation";
import Tab2 from "./components/tab2/Tab2";
import Champions from "./components/tab2/Champions";
import Conference from "./components/tab2/Conference";
import Europa from "./components/tab2/Europa";
import Tab3 from "./components/tab3/Tab3";
import Password from "./components/password/Password";
import DiceGame from "./components/gameCoin/DiceGame";
import Crowd from "./components/Crowd/Crowd";
import FootballPrediction from "./pages/games/FootballPrediction.jsx";
import FootballPredictionEn from "./pages/games/FootballPredictionEn.jsx";
import FirebaseConfiguration from "./pages/FirebaseConfiguration/FirebaseConfiguration.jsx";
import DiceCardGame from "./components/caedgame/DiceCardGame.jsx";
import McqQuiz from "./components/McqQuiz/McqQuiz.jsx";
import VideoSplashScreen from "./components/VideoSplashScreen/VideoSplashScreen .jsx";
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
  }, []);

  if (showSplash) {
    return <VideoSplashScreen onFinish={() => setShowSplash(false)} />;
  }

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
              <Route path="/rewards" element={<Card />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/europa" element={<Europa />} />
              <Route
                path="bottompage/football"
                element={<FootballPredictionSystem />}
              />
              <Route path="DiceGame" element={<DiceGame />} />
              <Route path="Crowd" element={<Crowd />} />
              <Route path="/cointransfer" element={<Cointransfer />} />
              <Route path="/page2" element={<Tab2 />} />
              <Route path="/page3" element={<Tab3 />} />
              <Route path="/page1" element={<FootballTeamFormation />} />
              <Route path="bottompage/password" element={<Password />} />
              <Route path="bottompage/Social" element={<Social />} />
              <Route path="bottompage/top" element={<Top />} />
              <Route
                path="FirebaseConfiguration"
                element={<FirebaseConfiguration />}
              />
              <Route path="McqQuiz" element={<McqQuiz />} />
              <Route path="/page4/DiceCardGame" element={<DiceCardGame />} />
              {/*<Route*/}
              {/*  path={"football-prediction-game/fa"}*/}
              {/*  element={<FootballPrediction />}*/}
              {/*/>*/}
              <Route
                path={"football-prediction-game/en"}
                element={<FootballPredictionEn />}
              />
            </Route>
          </Routes>
        </div>
        <Footer2 />
      </div>
    </BrowserRouter>
  );
};

export default App;
