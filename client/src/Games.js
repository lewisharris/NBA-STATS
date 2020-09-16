import React from "react";
import styled from "styled-components";

const Table = styled.table`
  margin: 0px auto;
  min-width: 75vw;
  border-collapse: collapse;
  margin-bottom: 50px;
`;

const Tr = styled.tr`
  padding: 0px;
  font-weight: ${props => {
    if (props.bold) {
      return "800";
    } else {
      return "auto";
    }
  }};
`;

const Td = styled.td`
  border-bottom: 1px solid #323c48;
  padding: 10px;
  box-sizing: border-box;
`;

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  componentDidMount() {
    fetch(
      `https://www.balldontlie.io/api/v1/games?seasons[]=2019&per_page[]=5`
    ).then(response =>
      response
        .json()
        .then(result => {
          const data = result.data;
          console.log(data);
          this.setState({ games: data.reverse() });
        })
        .catch(err =>
          console.log(`looks like there was an error, error code:${err}`)
        )
    );
  }

  render() {
    const latestGames = this.state.games.map(game => {
      return (
        <Tr key={game.id}>
          <Td> {}</Td>
          <Td>{game.home_team.abbreviation}</Td>
          <Td>{game.home_team_score}</Td>
          <Td>vs</Td>
          <Td>{game.visitor_team_score}</Td>
          <Td>{game.visitor_team.abbreviation}</Td>
          <Td>{game.period}</Td>
          <Td>{game.time.indexOf(" " !== -1) ? "Final Score" : game.time}</Td>
        </Tr>
      );
    });
    return (
      <div>
        Games:
        <Table id="simple-board">
          <tbody>
            <Tr bold>
              <Td id="cell0-0">Date</Td>
              <Td id="cell0-0">Home Team</Td>
              <Td id="cell0-1">Score</Td>
              <Td id="cell0-1"></Td>
              <Td id="cell0-1">Score</Td>
              <Td id="cell0-2">Away Team</Td>
              <Td id="cell0-2">Quarter</Td>
              <Td id="cell0-2">Time</Td>
            </Tr>
            {latestGames}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Games;
