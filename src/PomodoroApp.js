import React from "react";
import Header from "./components/Header";
import SetTimer from "./components/SetTimer";
import DisplayTimer from "./components/DisplayTimer";
import Controls from "./components/Controls";
import Footer from "./components/Footer";
import "./PomodoroApp.css";

class PomodoroApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakDefault: 5,
      sessionDefault: 25,
      timerMode: "session",
      time: 1500,
      active: false,
      touched: false,
    };

    this.handleSetTimers = this.handleSetTimers.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handlePlayPauseButton = this.handlePlayPauseButton.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.timerMode === "session") {
      this.setState({
        time: this.state.breakDefault * 60,
        timerMode: "break",
      });
      this.audio.play();
    }
    if (prevState.time === 0 && prevState.timerMode === "break") {
      this.setState({
        time: this.state.sessionDefault * 60,
        timerMode: "session",
      });
      this.audio.play();
    }
  }

  handleSetTimers = (increment, type) => {
    if (increment && this.state[type] === 60) return;
    if (!increment && this.state[type] === 1) return;
    let newValue = this.state[type] + (increment ? 1 : -1);
    if (type === "sessionDefault") {
      this.setState({
        sessionDefault: newValue,
        time: newValue * 60,
      });
    } else {
      this.setState({
        breakDefault: newValue,
      });
    }
  };

  handleResetButton = () => {
    this.setState({
      breakDefault: 5,
      sessionDefault: 25,
      time: 1500,
      timerMode: "session",
      touched: false,
      active: false,
    });
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.pomodoro);
  };

  handlePlayPauseButton = () => {
    if (this.state.active) {
      clearInterval(this.pomodoro);
      this.setState({
        active: false,
      });
    } else {
      if (this.state.touched) {
        this.pomodoro = setInterval(
          () => this.setState({ time: this.state.time - 1 }),
          1000
        );
        this.setState({ active: true });
      } else {
        this.setState(
          {
            time: this.state.sessionDefault * 60,
            touched: true,
            active: true,
          },
          () =>
            (this.pomodoro = setInterval(
              () => this.setState({ time: this.state.time - 1 }),
              1000
            ))
        );
      }
    }
  };

  setSecondsToMs = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = seconds - min * 60;

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  };

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="app-wrapper">
          <div className="timers-wrapper">
            <SetTimer
              type="break"
              title="Break Length"
              value={this.state.breakDefault}
              handleSetTimers={this.handleSetTimers}
            />
            <SetTimer
              type="session"
              title="Session Length"
              value={this.state.sessionDefault}
              handleSetTimers={this.handleSetTimers}
            />
          </div>
          <DisplayTimer
            modeType={this.state.timerMode}
            time={this.setSecondsToMs(this.state.time)}
          />
          <Controls
            active={this.state.active}
            handlePlayPause={this.handlePlayPauseButton}
            handleReset={this.handleResetButton}
          />
          <audio
            id="beep"
            src="https://res.cloudinary.com/drpcjt13x/video/upload/v1599590677/Proyectos/Pomodoro%20Clock/bells003_ne9dwp.wav"
            ref={(el) => (this.audio = el)}
          ></audio>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PomodoroApp;
