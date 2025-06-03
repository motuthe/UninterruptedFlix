import logo from '../assets/images/logo.png';
import skip from '../assets/images/skip-intro.png';
import episode from '../assets/images/next-episode.png';
import '../assets/scss/popup.scss';
import useCheckboxState from './useCheckboxState.ts';

function Popup() {
  const skipIntro = useCheckboxState('skipIntro');
  const nextEpisode = useCheckboxState('nextEpisode');

  return (
    <>
      <div className="logo">
        <img src={logo} alt="UninterruptedFlix Logo" />
      </div>
      <form>
        <label>
          <img src={skip} className="skip-intro-logo" alt="Skip Intro Logo" />
          <input
            type="checkbox"
            id="skipIntro"
            checked={skipIntro.isChecked}
            onChange={skipIntro.handleCheckboxChange}
          />
        </label>
      </form>
      <form>
        <label>
          <img src={episode} className="next-episode-logo" alt="Next Episode Logo" />
          <input
            type="checkbox"
            id="nextEpisode"
            checked={nextEpisode.isChecked}
            onChange={nextEpisode.handleCheckboxChange}
          />
        </label>
      </form>
    </>
  );
}

export default Popup;
