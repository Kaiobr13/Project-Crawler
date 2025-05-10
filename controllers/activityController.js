class activityController {
    buscar(){
        return "Buscando atividades...";
    }
    criar(){
        return "Criando atividade...";
    }
    alterar(id){
        return "Alterando atividade número " + id + "...";
    }
    deletar(id){
        return "Apagando atividade número " + id + "...";
    }
}

module.exports = new activityController();