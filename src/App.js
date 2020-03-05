import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';

function Home() {
  return <h2> Halaman Home </h2>
}

function ListView() {
  return (
    <div>
      <h2> Semua User </h2>
      <ul>
        <Link to='user/ihsan'> Ihsan </Link>
        <br />
        <Link to='user/robert'> Robert </Link>
      </ul>
    </div>
  );
}

function DetailView({ match }) {
  return <h2> Ini Halaman {match.params.name} </h2>
}

function NoMatch() {
  return <h2> 404, halaman tidak ditemukan </h2>
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  // Komsumsi API
  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  render() {

    const { isLoading } = this.state

    if (isLoading) {
      return <p>Loading.....</p>
    }

    return (
      <BrowserRouter>
        <div>
          <nav>
            <li> <Link to='/react-host/'> Home </Link> </li>
            <li> <Link to='/react-host/users'> User </Link> </li>
            <li> <Link to='/react-host/tabel'> Tabel </Link> </li>
          </nav>

          <main>
            <Switch>
              <Route path='/react-host/' exact component={Home} />
              <Route path='/react-host/users' exact component={ListView} />
              <Route path='/react-host/user/:name' exact component={DetailView} />
              <Route path='/react-host/tabel' exact >
                    <Column />
              </Route>
              <Route component={NoMatch} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }

}

class Column extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  // Komsumsi API
  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then(Response => Response.json())
      .then(data => this.setState({ items: data }))
  }

  render() {

    const { items } = this.state

    return (
      <div>
        <h2>Data User</h2>
        <ul>
          {items.map((item, index) =>
            <li key={index}> {item.name} </li>)}
        </ul>
      </div>
    );
  }

}

export default App;