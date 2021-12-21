exports.pagination= ( dogs, pagina,qtdDogs )=>{
    const start = qtdDogs * pagina; 
    const qtd = dogs.length/qtdDogs;

    const object = {
        qtdPaginas:Math.ceil(qtd),
        dogs:dogs.slice(start-qtdDogs,start)

    }
    return object;
}