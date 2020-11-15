let q = 0
$(document).ready(() => {
    mountResult();

    $('#btn').click(() => {
        mountResult()
    })
    
})

let mountResult = () => {
    $.ajax(`https://pokeapi.co/api/v2/pokemon/?offset=${q}&limit=20`)
    .done((data) => {
        $.each(data.results, (key, value) => {
            $.ajax(`${value.url}`)
            .done((data) => {

                let abilities = []
                let moves = []
                let pok_moves = data.moves.slice(0,5)

                $.each(data.abilities, (k, v) => {
                    let pok_abilities = v.ability.name
                    abilities.push(pok_abilities)
                })
                $.each(pok_moves, (k,v) => {
                    moves.push(v.move.name)
                })


                $('#pokemons').append(`<div class="card my-2 p-3 w-50 mx-auto"><img class="card-img-top w-25 h-25 align-self-center" src="${data.sprites.front_default}" alt="Card image cap"><div class="card-body text-center font-weight-bold"><p>${data.name}</p><button type="button" id="btn-pok" class="btn btn-primary mx-3" data-toggle="modal" data-target="#pokeModal" data-name="${data.name}" data-type="${data.types[0].type.name}" data-abilities="${abilities}" data-moves="${moves}">¡Quiero saber más de este Pokemon!</button>`)

                $.ajax(data.types[0].type.url)
                .done((data => {
                        let generation_pok = data.generation.name
                        $('#btn-pok').attr('data-generation', `${generation_pok}`)
                    }))
            })
            
        })
        q += 20
    })
    .fail(function(e){
        if(e.status === 404){
            console.log('El recurso no existe');
        }
    })
}

$('#pokeModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var pokemon = button.data('name')
    var type = button.data('type')
    var generation = button.data('generation')
    var abilities = button.data('abilities')
    var moves = button.data('moves')
    var modal = $(this)
    modal.find('.modal-title').text(pokemon)
    modal.find('.type').text(type)
    modal.find('.generations').text(generation)
    modal.find('.abilities').text(abilities)
    modal.find('.moves').text(moves)
  })