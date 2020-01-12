import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundary from "../components/ErrorBoundary";

import { setSearchField } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: []
    };
  }

  async componentDidMount() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    this.setState({ robots: users });
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading....</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
