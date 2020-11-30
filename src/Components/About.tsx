import React, { Component } from "react";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div id="aboutWrapper">
        <div id="aboutMain">
          <Link to="/">Return to Home</Link>
        </div>

        <div id="aboutCredits">
          <h3>Credits</h3>
          <div>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/those-icons"
              title="Those Icons"
            >
              Those Icons
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
