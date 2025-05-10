class sensorController {
    buscar(){
        return "Buscando sensores...";
    }
    criar(){
        return "Criando sensor...";
    }
    alterar(id){
        return "Alterando sensor número " + id + "...";
    }
    deletar(id){
        return "Apagando sensor número " + id + "...";
    }
}

module.exports = new sensorController();