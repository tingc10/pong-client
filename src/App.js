import React, { useEffect, useRef, useState } from 'react';
import { pingServerSocket } from './utils/socket';
import { throttle } from './utils/throttle';
import './App.css';
import { Loader } from './Loader';
import { IntroPanel } from './IntroPanel';

const UNITY_BUILD_PATH = 'unity-build/';
const WIDTH_TO_HEIGHT = 600 / 960;

function LoadingServer() {
  return (
    <div className="loading-server">
      <h3 className="loading-header">Loading Server</h3>
      <Loader />
    </div>
  );
}

function App() {
  const gameContainer = useRef();
  const [isLoadingServer, setIsLoadingServer] = useState(true);

  function resizeCanvas() {
    const canvas = document.getElementById('#canvas');
    if (!canvas) {
      return;
    }
    const { current } = gameContainer;
    const { offsetWidth: width } = current;
    canvas.width = width;
    canvas.height = WIDTH_TO_HEIGHT * width;
  }

  useEffect(() => {
    pingServerSocket().then(() => {
      setIsLoadingServer(false);
      window.UnityLoader.instantiate("gameContainer", `${UNITY_BUILD_PATH}Build/build.json`, { onProgress: window.UnityProgress });
    });
    resizeCanvas();
    window.addEventListener('resize', throttle(resizeCanvas, 100));
  }, []);

  return (
    <main className="pong">
      <div id="gameContainer" className="game-container" ref={gameContainer} />
      <IntroPanel serverReady={!isLoadingServer}/>
      {isLoadingServer && <LoadingServer />}
    </main>
  );
}

export default App;
