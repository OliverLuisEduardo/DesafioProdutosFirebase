import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

import Produto from "./produto.component";

export default class ProdutosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      produtos: [],
      currentProduto: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = ProdutoDataService.getAll().orderBy("nome", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let produtos = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      produtos.push({
        id: id,
        nome: data.nome,
        preco: data.preco,
      });
    });

    this.setState({
      produtos: produtos,
    });
  }

  refreshList() {
    this.setState({
      currentProduto: null,
      currentIndex: -1,
    });
  }

  setActiveProduto(produto, index) {
    this.setState({
      currentProduto: produto,
      currentIndex: index,
    });
  }

  render() {
    const { produtos, currentProduto, currentIndex } = this.state;

    return (
      <div className="grid row">
        <div className="col-md-6">
          <h4>Lista de Produtos</h4>

          <ul className="list-group">
            {produtos &&
              produtos.map((produto, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduto(produto, index)}
                  key={index}
                >
                  {produto.nome}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentProduto ? (
            <Produto
              produto={currentProduto}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Por favor selecione um produto na lista...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
