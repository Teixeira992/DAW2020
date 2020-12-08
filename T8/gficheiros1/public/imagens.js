function showImage(name, type){
    if(type == 'image/png' || type == 'image/jpeg')
        var ficheiro = $('<img src="/fileStore/' + name + '" width="80%"/>')
    else
        var ficheiro = $('<p>' + name + ', ' + type + '<p/>')
    var download = $('<div><a href="/files/download/' + name + '"> Download</a></div>')
    $("#display").empty()
    $('#display').append(ficheiro,download)
    $('#display').modal()
}

$(function () {
    var cont = 1
       $("#mais1").click(e => {
        e.preventDefault()
        cont++;

        var upload = $('<div></div>', {class: 'w3-container', id:'file'+cont})

        var desc = $('<div></div>', {class: 'w3-cell-row', id:'desc'+cont})
        var descLabel = $('<label class="w3-text-teal"><b>Description</b></label>')
        var descInput = $('<input/>', {class: "w3-input w3-border w3-Pale-Yellow", type:"text", name:"desc"})

        var file = $('<div></div>', {class: 'w3-cell-row', id:'myFile'+cont})
        var fileLabel = $('<label class="w3-text-teal"><b>Select file</b></label>')
        var fileupload = $('<input/>', {class: "w3-input w3-border w3-Pale-Yellow", type:"file", name:"myFile"})


        $("#list").append(upload)

        $("#file"+cont).append(desc)
        $("#desc"+cont).append(descLabel, descInput)

        $("#file"+cont).append(file)
        $("#myFile"+cont).append(fileLabel, fileupload)
    })
})