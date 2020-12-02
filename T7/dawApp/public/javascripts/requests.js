function sendEditarItem(id) {
    const newAluno = {
        numero: document.getElementById("numero").value,
        nome: document.getElementById("nome").value,
        git: document.getElementById("git").value
    }
    axios.put("/students/" + id, newAluno)
        .then(response => window.location.assign("/students"))
        .catch(err => console.log(err))
}


function apagaItem(id){
    axios.delete('/students/' + id)
        .then(response => window.location.assign('/students'))
        .catch(error => console.log(error));
}


function adicionarTPC(id) {
    axios.put("/students/addtpc/" + id)
        .then(response => window.location.assign("/students/" + id))
        .catch(err => console.log(err))
}

function removerTPC(id) {
    axios.put("/students/remtpc/" + id)
        .then(response => window.location.assign("/students/" + id))
        .catch(err => console.log(err))
}