import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  state = {jokes: []};  
  
  /* get jokes if there are no jokes */
  
  async getJokes(){
    const { jokes } = this.state;
    let j = [...jokes];
    let seenJokes = new Set();
    try {
      const { numJokesToGet } = this.props;
      while (j.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }

      this.setState({jokes: j});
    } catch (e) {
      console.log(e);
    }
  }
  
  componentDidMount(){
    if (this.state.jokes.length === 0) this.getJokes();
  }
  
  componentDidUpdate(){
    if (this.state.jokes.length === 0) this.getJokes();
  }
  /* empty joke list and then call getJokes */
  
  generateNewJokes = () => {
    this.setState({ jokes: []});
  }
  /* change vote for this id by delta (+1 or -1) */

  vote = async (id, delta) => {
    this.setState({ 
      jokes: this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    });
  }

  /* render: either loading spinner or list of sorted jokes. */
  render(){
    const { jokes } = this.state;

    if (jokes.length) {
      let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
      
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }

    return (
      <div>
          <img src="https://thumbs.gfycat.com/DevotedDiligentAllosaurus-small.gif" width="500" />
      </div>
    );
  }
}

export default JokeList;
