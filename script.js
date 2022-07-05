var operacao_select = document.getElementById('select')
var operacao_input_div = document.getElementById('input_div')

var operacao_input = document.getElementById('input')

// var operacao_array

var select_listener = document.addEventListener("input", () => {
    var select_value = operacao_select.value

    if (select_value == 0) {
        operacao_input_div.innerHTML = 
        `
            <input placeholder="soma" />
            +
            <input placeholder="soma" />
        
        `

    } else if (select_value == 1) {
        operacao_input_div.innerHTML = 
        `
            <input placeholder="subtração" />
            -
            <input placeholder="subtração" />
        `
    }
})

// var input_listener = document.addEventListener("input", () => {
//     var operacao_input_value = operacao_input.value

//     console.log(operacao_input_value)

// })