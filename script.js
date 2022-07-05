var operacao_select = document.getElementById('select')

var operacao_input_father = document.getElementById('input_father')
var operacao_input_div = document.getElementById('input_div')

var operacao_btn_calculate = document.getElementById('btn_calculate')

// Escutando o evento de seleção de operação
var select_listener = operacao_select.addEventListener("input", () => {
    var select_value = operacao_select.value
    var operacao_type

    // Tipo de operação
    if (select_value == 0) operacao_type = 'Soma'
    else if (select_value == 1) operacao_type = 'Subtração'

    // Remove a classe hidden da div do input
    operacao_input_father.classList.remove('hidden')

    // Imprimindo os Inputs
    operacao_input_div.innerHTML = 
        `
            <input placeholder="${operacao_type}: Valor 1" id="first_value" />
            ${operacao_type == 'Soma' ? '+' : '-'}
            <input placeholder="${operacao_type}: Valor 2" id="second_value" />
        `
})

// Escutando o evento de calcular operação
var btn_listener = operacao_btn_calculate.addEventListener("click", () => {
    var first_value = document.getElementById('first_value').value
    var second_value = document.getElementById('second_value').value

    alert(`${first_value} ${second_value}`)
})