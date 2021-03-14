import React from "react";
import "./index.css";

export default class Starships extends React.Component {
  state = {
    pilots: [],
  };

  showPilots = (starship) => {
    this.setState({
      pilots: [],
    });
    if (!starship.pilots.length) {
      const noNewPilots = { name: "No pilots" };
      const noPilots = [noNewPilots];
      this.setState({
        pilots: noPilots,
      });
    } else {
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
    }
  };

  render() {
    return (
      <div className="starships-pilots-container">
        <div>
          {this.props.starships.map((starship) => (
              <button
                className="starship-name"
                onClick={() => {
                  this.showPilots(starship);
                }}
              >
                {starship.name}
              </button>
          ))}
        </div>
        <div className="pilot-name-container">
          {this.state.pilots.map((pilot) => (
            <button className="pilot-name">{pilot.name}</button>
          ))}
        </div>
      </div>
    );
  }
}
