import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduto from "./components/add-produto.component";
import ProdutosList from "./components/produtos-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/produtos" className="navbar-brand">
            Eduardo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>....</h2>
          <Switch>
            <Route exact path={["/", "/produtos"]} component={ProdutosList} />
            <Route exact path="/add" component={AddProduto} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
