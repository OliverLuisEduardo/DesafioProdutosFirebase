import firebase from "../firebase";

const db = firebase.collection("/produtos");

class ProdutoDataService {
  getAll() {
    return db;
  }

  create(produto) {
    return db.add(produto);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new ProdutoDataService();
