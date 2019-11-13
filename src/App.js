import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.UnityLoader.instantiate("gameContainer", "unity-build/Build/build.json", {onProgress: window.UnityProgress});
  }, []);

  return (
    <div className="App">
      <div id="gameContainer" style={{ width: 960, height: 600 }} />
    </div>
  );
}

export default App;
