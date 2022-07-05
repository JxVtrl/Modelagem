var operacao_select = document.getElementById('select')
var operacao_type

var operacao_input_father = document.getElementById('input_father')
var operacao_input_div = document.getElementById('input_div')
var result_div = document.getElementById('result_div')

var operacao_btn_calculate = document.getElementById('btn_calculate')


// Escutando o evento de seleção de operação
var select_listener = operacao_select.addEventListener("input", () => {
    result_div.innerHTML = ''

    var select_value = operacao_select.value

    // Tipo de operação
    if (select_value == 0) operacao_type = 'Soma'
    else if (select_value == 1) operacao_type = 'Subtração'

    // Remove a classe hidden da div do input
    operacao_input_father.classList.remove('hidden')

    // Imprimindo os Inputs
    operacao_input_div.innerHTML = 
        `
            <input type="number" placeholder="Valor 1" id="first_value" />
            ${operacao_type == 'Soma' ? '+' : '-'}
            <input type="number" placeholder="Valor 2" id="second_value" />
        `
})



// Escutando o evento de calcular operação
var btn_listener = operacao_btn_calculate.addEventListener("click", () => {
    var first_value = document.getElementById('first_value').value
    var second_value = document.getElementById('second_value').value

    var array_1 = first_value.split('')
    var array_2 = second_value.split('')

    calculateResult(array_1, array_2)
})

function consoleFun(array_1, array_2) {
    console.log(array_1)
    console.log(array_2)
}

function calculateResult(array_1, array_2) {
    // transformando os arrays em arrays de números
    array_1.map((value, index) => {
        array_1[index] = parseInt(value)
    })

    array_2.map((value, index) => {
        array_2[index] = parseInt(value)
    })

    // verificando se os arrays tem o mesmo tamanho
    if (array_1 > array_2) {
        let qtd = array_1.length - array_2.length
         for (let i = 0; i < qtd; i++) {
            array_2.unshift(0)
        }
    } else if (array_2 > array_1) {
        let qtd = array_2.length - array_1.length
        for (let i = 0; i < qtd; i++) {
            array_1.unshift(0)
        }
    }

    array_1.reverse()
    array_2.reverse()

    consoleFun(array_1, array_2)
    
    var array_result = []

    if (operacao_type == 'Soma') {
        // somando os arrays
        for (var i = 0; i < array_1.length; i++) {
            array_result[i] = array_1[i] + array_2[i]
        }

        // se algum valor for maior que 9, soma ao próximo valor
        for (var i = 0; i < array_result.length; i++) {
            if (array_result[i] > 9) {
                array_result[i] -= 10
                array_result[i + 1] += 1
            }
        }

        var result = array_result.reverse().join('')

    } else if (operacao_type == 'Subtração') {
        // caso o array_2 seja maior que o array_1, inverte os arrays
        var temp_array = []
        if (array_2 > array_1) {
            temp_array = array_1
            array_1 = array_2
            array_2 = temp_array
        }

        // subtraindo os arrays
        for (var i = 0; i < array_1.length; i++) {
            array_result[i] = array_1[i] - array_2[i]
        }

        // se algum valor for menor que 0, soma ao próximo valor do array_1
        for (var i = 0; i < array_result.length; i++) {
            if (array_result[i] < 0) {
                array_result[i] += 10
                array_result[i + 1] -= 1
            }
        }
        
        // remove os 0s desnecessários
        while (array_result[array_result.length - 1] == 0) {
            array_result.pop()
        }

        console.log(array_result)
        var result = array_result.reverse().join('')
        if (temp_array) result *= -1
        
    }
    
    result_div.innerHTML = `Resultado: ${result}`
}