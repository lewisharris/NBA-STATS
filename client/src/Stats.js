import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Li = styled.li`
  background: none;
  border: 2px solid hotpink;
  border-radius: 100px;
  padding: 5px 10px;
  margin: 10px;
  :hover {
    background: hotpink;
  }
`;

const H3 = styled.h3`
  margin: 0px;
  padding: 0;
  font-size: 14px;
`;
const P = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 12px;
`;

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerSearch: "", playerList: [] };
  }

  submitForm = e => {
    e.preventDefault();
    fetch(
      `https://www.balldontlie.io/api/v1/players?search=${this.state.playerSearch}`
    ).then(response =>
      response
        .json()
        .then(result => {
          this.setState({ playerList: result.data });
          console.log(result.data);
        })
        .catch(err =>
          console.log(`looks like there was an error, error code:${err}`)
        )
    );
  };

  handleChange = e => {
    this.setState({ playerSearch: e.target.value });
  };

  render() {
    const players = this.state.playerList.map(player => {
      return (
        <Li key={player.id}>
          <H3>
            {player.first_name} {player.last_name}
          </H3>
          <P>{player.team.full_name}</P>
        </Li>
      );
    });
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.playerSearch}
          ></input>
          <button type="submit">Find Player</button>
        </form>
        Stats:
        <div>
          <Ul>{players}</Ul>
        </div>
      </div>
    );
  }
}

export default Stats;
