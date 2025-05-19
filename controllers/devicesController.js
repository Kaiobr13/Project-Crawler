class deviceController {
  buscar() {
    return "Buscando dispositivos...";
  }
  criar() {
    return "Criando dispositivo...";
  }
  alterar(id) {
    return "Alterando dispositivo número " + id + "...";
  }
  deletar(id) {
    return "Apagando dispositivo número " + id + "...";
  }
}

module.exports = new deviceController();
