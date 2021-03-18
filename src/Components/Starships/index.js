import React from "react";
import "./index.css";

export default class Starships extends React.Component {
  state = {
    pilots: [],
    starships: [],
  };

  showPilots = (starship) => {
    this.setState({
      pilots: [],
    });

    starship.pilots.map((pilot) => {
      fetch(pilot)
        .then((res) => res.json())
        .then((pilotData) => {
          const newPilot = pilotData;
          const pilots = [...this.state.pilots, newPilot];
          this.setState({
            pilots: pilots,
          });
        })
        .catch((err) => alert(err));
    });
  };

  showDetails = (starship) => {
    let b = {};
    b[starship.name] = starship;
    this.setState({
      starships: b,
    });
  };

  render() {
    return (
      <div className="starships-pilots-container">
        <div>
          {this.props.starships.map((starship) => (
            <>
              <button className="starship-name">{starship.name}</button>
              {starship.pilots.length === 0 ? (
                <p className="no-pilots-to-show">No pilots</p>
              ) : (
                <button
                  className="show-pilots-button"
                  onClick={() => {
                    this.showPilots(starship);
                  }}
                >
                  See pilots
                </button>
              )}
            </>
          ))}
        </div>
        <div className="pilot-name-container">
          {this.state.pilots.map((pilot) => (
            <button className="pilot-name">
              {pilot.name}
              <button className="favorite-button"></button>
            </button>
          ))}
        </div>
      </div>
    );
  }
}
