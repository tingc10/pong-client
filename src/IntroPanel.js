import React, {useState} from 'react';
import './IntroPanel.css';
import classnames from 'classnames';

const MOBILE_GAMEPAD_URL = 'bit.ly/virtualgamepad';

export function IntroPanel({ serverReady = false }) {
  const [hideOverlay, setHideOverlay] = useState(false);

  function handleClickOverlay() {
    if (serverReady) {
      setHideOverlay(true);
    }
  }

  return (
    <div className={classnames('panel-container', { hide: hideOverlay })} onClick={handleClickOverlay}>
      <section className={classnames('panel', { hide: !serverReady || hideOverlay })}>
        <h2>Virtual Couch Gaming</h2>
        <p>
          This is a proof of concept multiplayer couch game. You can play local multiplayer or have a friend boot up the link from another desktop and play from a different location.
        </p>
        <p>
          Regardless of how you play multiplayer, you control the pong paddles with your phone. To get started, open up <b>{MOBILE_GAMEPAD_URL}</b> from your mobile device (Chrome works best). Once loaded, enter the client ID from your desktop to control a paddle.
        </p>
        <p>
          To move the paddle, tilt your phone left and right in landscape mode. If your paddle movement is inverted, you may want to rotate your phone.
        </p>
        <p>
          Click anywhere to begin!
        </p>
      </section>
    </div>
  );
}