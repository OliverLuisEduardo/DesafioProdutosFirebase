import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      currentProduto: {
        id: null,
        nome: "",
        preco: "",
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { produto } = nextProps;
    if (prevState.currentProduto.id !== produto.id) {
      return {
        currentProduto: produto,
        message: ""
      };
    }

    return prevState.currentProduto;
  }

  componentDidMount() {
    this.setState({
      currentProduto: this.props.produto,
    });
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          nome: nome,
        },
      };
    });
  }

  onChangePreco(e) {
    const preco = e.target.value;

    this.setState((prevState) => ({
      currentProduto: {
        ...prevState.currentProduto,
        preco: preco,
      },
    }));
  }

  updateProduto() {
    const data = {
      nome: this.state.currentProduto.nome,
      preco: this.state.currentProduto.preco,
    };

    ProdutoDataService.update(this.state.currentProduto.id, data)
      .then(() => {
        this.setState({
          message: "The produto was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProduto() {
    ProdutoDataService.delete(this.state.currentProduto.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduto } = this.state;

    return (
      <div>
        <h4>Produto</h4>
        {currentProduto ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentProduto.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preco">Preço</label>
                <input
                  type="text"
                  className="form-control"
                  id="preco"
                  value={"R$ " + currentProduto.preco}
                  onChange={this.onChangePreco}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduto}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Produto...</p>
          </div>
        )}
      </div>
    );
  }
}
