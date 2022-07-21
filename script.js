var sum_select = document.getElementById('sum_select')
var sub_select = document.getElementById('sub_select')

var operacao_input_father = document.getElementById('input_father')
var operacao_input_div = document.getElementById('input_div')
var calculate_btn = document.getElementById('btn_calculate')

var result_div = document.getElementById('result_div')

var base_select = document.getElementById('basen');
var base;

// Seleção de operação
var select_sum = sum_select.addEventListener('click', () => selectType(type = 'sum'))
var select_sub = sub_select.addEventListener('click', () => selectType(type = 'sub'))

// Selecionando o tipo de operação
function selectType(type) {
    result_div.innerHTML = ''

    // Remove a classe hidden da div do input
    operacao_input_father.classList.remove('hidden')

    // Imprimindo os Inputs
    operacao_input_div.innerHTML = 
    `
        <input 
            type="text" 
            placeholder="Valor 1(0-z)" 
            class="input_value" 
            id="first_value" 
        />
        ${type == 'sum' ? '+' : '-'}
        <input
            type="text"
            placeholder="Valor 2(0-z)"
            class="input_value"
            id="second_value"
        />
    `
}

// Seleção de base
var base_listener = base_select.addEventListener("input", () => base = parseInt(base_select.value))

// Botão de calcular
var btn_listener = calculate_btn.addEventListener("click", () => {
    var first_value = document.getElementById('first_value').value
    var second_value = document.getElementById('second_value').value

    var array_1 = first_value.split('')
    var array_2 = second_value.split('')

    const negative = validateValue(array_1, array_2)

    if (!first_value || !second_value || !base_select.value)
        result_div.innerHTML = 'Preencha todos os campos'
    else {
        if (negative) 
            calculateResult(array_1, array_2, negative)
        else
            calculateResult(array_1, array_2)
    }
})

function validateValue(array_1, array_2) {
    if (array_1[0] == '-' || array_2[0] == '-') {
        if (array_1[0] == '-' && array_2[0] == '-') {
            return true
        } else if (array_1[0] == '-') {
            return 1
        } else if (array_2[0] == '-') {
            return 2
        } 
    } else {
        return false
    }
}

function calculateResult(array_1, array_2, negative = false) {
    var array_result = []
    console.clear()

    // verificando se os arrays tem o mesmo tamanho
    if (array_1.length > array_2.length) {
        let qtd = array_1.length - array_2.length
        for (let i = 0; i < qtd; i++) {
            array_2.unshift(0)
        }
    } else if (array_2.length > array_1.length) {
        let qtd = array_2.length - array_1.length
        for (let i = 0; i < qtd; i++) {
            array_1.unshift(0)
        }
    }

    // Converte um caracter pra seu valor correspondente numérico
    // Ex.: a = 10, b = 11, c = 12, etc.
    let auxChar;
    for (let a = 0; a < array_1.length; a++)
    {
        if (array_1[a] >= 'a' && array_1[a] <= 'z')
        {
            auxChar = array_1[a];
            array_1[a] = auxChar.charCodeAt(0) - 87;
        }

        if (array_2[a] >= 'a' && array_2[a] <= 'z')
        {
            auxChar = array_2[a];
            array_2[a] = auxChar.charCodeAt(0) - 87;
        }

        if (array_1[a] >= 'A' && array_1[a] <= 'Z')
        {
            auxChar = array_1[a];
            array_1[a] = auxChar.charCodeAt(0) - 55;
        }

        if (array_2[a] >= 'A' && array_2[a] <= 'Z')
        {
            auxChar = array_2[a];
            array_2[a] = auxChar.charCodeAt(0) - 55;
        }
    }
    
    // transformando os arrays em arrays de números
    array_1.map((value, index) => {
        array_1[index] = parseInt(value)
    })

    array_2.map((value, index) => {
        array_2[index] = parseInt(value)
    })
    
    // Verifica se há um número inválido com a base escolhida
    for (let i = 0; i < array_1.length; i++)
    {
        if (array_2[i] >= base && array_1[i] >= base)
        {
            result_div.innerHTML = "Números inválidos pra base " + base;
            return;
        }
        else if (array_1[i] >= base)
        {
            result_div.innerHTML = "O primeiro número é inválido pra base " + base;
            return;
        }
        else if (array_2[i] >= base)
        {
            result_div.innerHTML = "O segundo número é inválido pra base " + base;
            return;
        }
    }

    if (type == 'sum') {
        // somando os arrays
        for (let i = 0; i < array_1.length; i++) {
            array_result[i] = array_1[i] + array_2[i]
        }

        // Se algum valor for maior que a base, soma ao próximo valor
        for (let i = 0; i < array_result.length; i++)
        {
            if (array_result[i] >= base)
            {
                array_result[i] -= base;

                // Evitar índice negativo. Ex.: caso 99 + 99
                if (i == 0) 
                {
                    array_result.unshift(1);
                }
                else
                {
                    array_result[i - 1] += 1;
                }

                // Um número anterior pode ficar maior que a base
                if (array_result[i - 1] >= base)
                {
                    i -= 2;
                }
            }
        }
        // Site para ajudar a verificar: https://www.calculadoraonline.com.br/operacoes-bases
    
    } else if (type == 'sub') {
        // verificar qual array tem o maior valor
        if (parseInt(array_1.join('')) < parseInt(array_2.join(''))) {
            var aux = array_1
            array_1 = array_2
            array_2 = aux
        }

        // subtraindo valores dos arrays
        for (let i = 0; i < array_1.length; i++) {
            array_result[i] = array_1[i] - array_2[i]
        }

        // Se algum valor for menor que 0, soma a base ao próximo valor
        for (let i = 0; i < array_result.length; i++) 
        {
            if (array_result[i] < 0) 
            {
                array_result[i] += base;
                array_result[i - 1] -= 1;
            }
            // Se um número anterior ficar menor que 0
            if (array_result[i - 1] < 0)
            {
                i -= 2;
            }
        }

        // removendo os 0s desnecessários
        while(array_result[0] == 0) 
        {
            // Não remover o 0 se só houver ele
            if (array_result.length == 1)
            {
                break;
            }
            array_result.shift()
        }

        if (aux && aux.length > 0) {
            array_result.unshift('-')
        }

    }

    // Converte números em letras para bases >= 10
    for (let a = 0; a < array_result.length; a++)
    {
        if (array_result[a] >= 10 && array_result[a] <= 35)
        {
            array_result[a] = String.fromCharCode(array_result[a] + 55);
        }
    }
        
    var result = array_result.join('')   
    result_div.innerHTML = result
}
