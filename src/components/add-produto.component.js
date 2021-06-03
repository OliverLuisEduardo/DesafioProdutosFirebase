import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {
      nome: "",
      preco: "",
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value,
    });
  }

  onChangePreco(e) {
    this.setState({
      preco: e.target.value,
    });
  }

  saveProduto() {
    let data = {
      nome: this.state.nome,
      preco: this.state.preco,
    };

    ProdutoDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      nome: "",
      preco: "",
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Produto Adicionado!</h4>
            <button className="btn btn-success" onClick={this.newProduto}>
              Adicionar mais um produto
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço em R$</label>
              <input
                type="text"
                className="form-control"
                id="preco"
                required
                value={this.state.preco}
                onChange={this.onChangePreco}
                name="preco"
              />
            </div>

            <button onClick={this.saveProduto} className="btn btn-success">
              Adicionar
            </button>
          </div>
        )}
      </div>
    );
  }
}
