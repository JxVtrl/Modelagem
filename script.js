var sum_select = document.getElementById('sum_select')
var sub_select = document.getElementById('sub_select')

var operacao_input_father = document.getElementById('input_father')
var operacao_input_div = document.getElementById('input_div')
var calculate_btn = document.getElementById('btn_calculate')

var ajuda_txt = document.getElementById('ajuda_txt')
var slider_base = document.getElementById('slider_base')

var result_div = document.getElementById('result_div')

var base_select = document.getElementById('basen');
var base;

// Seleção de operação
var select_sum = sum_select.addEventListener('click', () => selectType(type = 'sum'))
var select_sub = sub_select.addEventListener('click', () => selectType(type = 'sub'))
var slider = slider_base.addEventListener('click', () => base_select.value = slider_base.value) // Quando escolher a base pela barra, atualiza o valor no campo

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
            placeholder="Valor 1 (0-Z)" 
            class="input_value" 
            id="first_value" 
        />
        ${type == 'sum' ? '+' : '-'}
        <input
            type="text"
            placeholder="Valor 2 (0-Z)"
            class="input_value"
            id="second_value"
        />
    `
    ajuda_txt.innerHTML = // Texto de ajuda muda quando a operação é selecionada
    `
    <h1>Operação Selecionada</h1>
    
    <p>
    A operação foi selecionada. Selecione a base numérica e digite os valores a serem calculados.
    <br><br>
    <b>LEMBRETE:</b> Em bases maiores do que 10, será possível utilizar letras para representar algarismos maiores que 9, de forma que <i>9 + 1 = A</i>, por exemplo. O limite de letras depende do valor da base. Na base máxima suportada, a base 36, aceita-se algarismos de 0 até 9, além das letras de A até Z, que representam algarismos de 10 a 35.
    </p>
    
    
    <a href="#" class="modal__close">&times;</a>
    `
    
}

// Seleção de base
var base_listener = base_select.addEventListener("input", () => base = parseInt(base_select.value))
var base_update_slider = slider_base.addEventListener('click', () => base = base = parseInt(base_select.value)) // Atualiza de fato a base de cálculo quando alterada via slider

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
            return 3
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
    var typeOperador = type;
    var racional_1, racional_2;

    // Retira o "-"(menos) de um array
    if (array_1[0] == "-")
    {
        array_1.shift();
    }
    if (array_2[0] == "-")
    {
        array_2.shift();
    }

    // Identifica se um numero é racional
    for (let i = 0; i < array_1.length; i++)
    {
        if (array_1[i] == ":")
        {
            racional_1 = i;
            array_1.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < array_2.length; i++)
    {
        if (array_2[i] == ":")
        {
            racional_2 = i;
            array_2.splice(i, 1);
            break;
        }
    }
    
/*
Casos do operador +:
    (x) + (y) = +(x+y)
    *(-x) + (y) = +=(x-y)* -> operador muda!
    (-x) + (-y) = -(x+y)

Casos do operador -:
    (x) - (y) = +-(x-y)
    *(-x) - (y) = -(x+y)* -> operador muda!
    (-x) - (-y) = +-(x-y)
*/
    if (negative == 1 || negative == 2)
    {
        if (type == "sub")
        {
            typeOperador = "sum";
        }
        else
        {
            typeOperador = "sub";
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

        if (array_1[a] >= 'A' && array_1[a] <= 'Z')
        {
            auxChar = array_1[a];
            array_1[a] = auxChar.charCodeAt(0) - 55;
        }
    }
    for (let a = 0; a < array_2.length; a++)
    {
        if (array_2[a] >= 'a' && array_2[a] <= 'z')
        {
            auxChar = array_2[a];
            array_2[a] = auxChar.charCodeAt(0) - 87;
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

    // Separa o numerador e denominador em dois arrays distintos
    if (racional_1 || racional_2)
    {
        var denominador_1 = [], denominador_2 = [];

        if (racional_1)
        {
            denominador_1 = array_1.slice(racional_1);
            array_1.splice(racional_1, array_1.length - 1);
        }
        else if (!racional_1)
        {
            racional_1 = array_1.length;
            denominador_1.unshift(1);
        }
        
        if (racional_2)
        {
            denominador_2 = array_2.slice(racional_2);
            array_2.splice(racional_2, array_2.length - 1);
        }
        else if (!racional_2)
        {
            racional_2 = array_2.length;
            denominador_2.unshift(1);
        }

        // Produto dos dois denominadores (M.M.C.)
        var produtoD = multiDenominador(denominador_1, denominador_2);
        // "M.M.C. - divide pelo debaixo(denominador) multiplica pelo de cima(numerador)"
        var multiArray1 = multiArraysE(array_1, divideArray(denominador_1, produtoD), base);
        var multiArray2 = multiArraysE(array_2, divideArray(denominador_2, produtoD), base);
    }

    if (typeOperador == 'sum') {
        if (racional_1 || racional_2)
        {
            var numerador = functionSoma(multiArray1, multiArray2, base, negative);

            array_result = [numerador.join(""), ":", produtoD];

            // Se o numerador for zero o "array_result" será zero
            if (parseInt(numerador[0]) == 0 && (numerador.length == 1))
            {
                array_result = [0];
            }

            var result = array_result.join("");
            result_div.innerHTML = result;
            return;
        }
        else
        {
            array_result = functionSoma(array_1, array_2, base, negative);
        }
    } else if (typeOperador == 'sub') {
        if (racional_1 || racional_2)
        {
            var numerador = functionSub(multiArray1, multiArray2, base, negative, type);

            if (parseInt(numerador[0]) == 0)
            {
                array_result = [0];
            }
            else
            {
                array_result = [numerador.join(""), ":", produtoD];

                var result = array_result.join("");
                result_div.innerHTML = result;
                return;
            }
        }
        else
        {
            array_result = functionSub(array_1, array_2, base, negative, type);
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

// Função que soma dois arrays inteiros, ambos de determinada base numérica
function functionSoma(array_1, array_2, base, negative)
{
    var array_result = [];

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
    
    // (-x) + (-y) = -(x+y)
    // (-x) - (y) = -(x+y)
    if (negative == 3)
    {
        array_result.unshift("-");
    }
    else if (negative == 1)
    {
        array_result.unshift("-");
    }

    return array_result;
}

// Função que subtrai dois arrays inteiros, ambos de determinada base numérica
function functionSub(array_1, array_2, base, negative, type)
{
    var array_result = [];

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
        // E também não precisa de "-"(menos) se for só um zero, logo pode dar return
        if (array_result.length == 1)
        {
            return array_result;
        }
        array_result.shift()
    }

    // (x) + (-y) = -(y-x), |y| > |x|
    // (-x) + (y) = -(x-y), |x| > |y| 
    if (type == "sum")
    {
        if (aux && negative == 2)
        {
            array_result.unshift("-");
        }
        else if (!aux && negative == 1)
        {
            array_result.unshift("-");
        }
    }
    else
    {
        // (-x) - (-y) = -(x-y), |y| < |x|
        // (x) - (y) = -(x-y), |y| > |x|
        if (negative == 3 && !aux)
        {
            array_result.unshift("-");
        }
        else if (aux && aux.length > 0 && negative != 3)
        {
            array_result.unshift("-");
        }
    }

    return array_result;
}

// Função provisória que multiplica um array com escalar e retorna o resultado em um array
function multiArraysE(array1, escalar, base)
{
    var array_result = [];

    for (let i = 0; i < array1.length; i++)
    {
        array_result[i] = parseInt(array1[i]) * escalar;
    }

    for (let i = 0; i < array_result.length; i++)
    {
        if (array_result[i] >= base)
        {
            array_result[i] = parseInt(array_result[i]) - base;
    
            // Evitar índice negativo. Ex.: caso 99 + 99
            if (i == 0) 
            {
                array_result.unshift(1);
            }
            else
            {
                array_result[i - 1] = parseInt(array_result[i - 1]) + 1;
            }

            // Um número anterior pode ficar maior que a base
            if (parseInt(array_result[i - 1]) >= base && (i != 0))
            {
                i -= 2;
            }

            // Às vezes será necessário subtraí-lo mais vezes
            if (parseInt(array_result[i]) >= base)
            {
                i -= 1;
            }
        }
    }

    return array_result;
}

// Função provisória que multiplica dois denominadores(arrays) e retorna o resultado
function multiDenominador(array1, array2)
{
    var aux1 = [array1[0]], aux2 = [array2[0]];

    for (let i = 1; i < array1.length; i++)
    {
        aux1[0] += "" + array1[i];
    }

    for (let i = 1; i < array2.length; i++)
    {
        aux2[0] += "" + array2[i];
    }

    if (parseInt(aux1[0]) == parseInt(aux2[0]))
    {
        return parseInt(aux1[0]);
    }
    else
    {
        return parseInt(aux1[0]) * parseInt(aux2[0]);
    }
}

// Função provisória que divide um número por um array
function divideArray(array1, dividendo)
{
    var aux1 = [array1[0]];

    for (let i = 1; i < array1.length; i++)
    {
        aux1[0] += "" + array1[i];
    }

    return dividendo / parseInt(aux1[0]);
}