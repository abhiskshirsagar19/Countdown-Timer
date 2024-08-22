/* eslint-disable react/prop-types */
function ShowTimer(props) {
  const {
    hours,
    minutes,
    seconds,
    isPause,
    handlePause,
    handleResume,
    handleReset,
  } = props;
  return (
    <div className="show-container">
      <div className="timer-box">
        <div>{hours < 10 ? `0${hours}` : hours}</div>
        <span>:</span>
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
        <span>:</span>
        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
      <div className="action-box">
        {!isPause && (
          <button className="timer-button" onClick={handlePause}>
            Pause
          </button>
        )}
        {isPause && (
          <button className="timer-button" onClick={handleResume}>
            Resume
          </button>
        )}
        <button className="timer-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default ShowTimer;
