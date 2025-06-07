import logo from '../assets/images/logo.png';
import skip from '../assets/images/skip-intro.png';
import episode from '../assets/images/next-episode.png';
import recap from '../assets/images/skip-recap.png';
import '../assets/scss/popup.scss';
import useCheckboxState from './useCheckboxState.ts';

// Popup component displayed when the extension icon is clicked.

function Popup() {
  // Each checkbox uses the custom hook to persist its state.
  const skipIntro = useCheckboxState('skipIntro');
  const nextEpisode = useCheckboxState('nextEpisode');
  const skipRecap = useCheckboxState('skipRecap');

  // Render logo and two checkboxes controlling the extension's behaviour.
  return (
    <>
      <div className="logo">
        <img src={logo} alt="UninterruptedFlix Logo" />
      </div>
      <div className="settings">
        <form>
          <label>
            <input
              type="checkbox"
              id="skipIntro"
              checked={skipIntro.isChecked}
              onChange={skipIntro.handleCheckboxChange}
            />
            <img src={skip} className="skip-intro-logo" alt="Skip Intro Logo" />
          </label>
        </form>
        <form>
          <label>
            <input
              type="checkbox"
              id="skipRecap"
              checked={skipRecap.isChecked}
              onChange={skipRecap.handleCheckboxChange}
            />
            <img src={recap} className="skip-recap-logo" alt="Skip Recap Logo" />
          </label>
        </form>
        <form>
          <label>
            <input
              type="checkbox"
              id="nextEpisode"
              checked={nextEpisode.isChecked}
              onChange={nextEpisode.handleCheckboxChange}
            />
            <img src={episode} className="next-episode-logo" alt="Next Episode Logo" />
          </label>
        </form>
      </div>
    </>
  );
}

export default Popup;
