var sum_select = document.getElementById('sum_select')
var sub_select = document.getElementById('sub_select')

var operacao_input_father = document.getElementById('input_father')
var operacao_input_div = document.getElementById('input_div')
var calculate_btn = document.getElementById('btn_calculate')

var ajuda_txt = document.getElementById('ajuda_txt')
var slider_base = document.getElementById('slider_base')

var result_div = document.getElementById('result_div')

var base_select = document.getElementById('basen');
var base = base_select.value;

var memoria_calculo = document.getElementById('memoria_calculo');

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
    var vetor_memoria = [];
    console.clear()
    var typeOperador = type;
    var racional_1, racional_2;
    base = parseInt(base);

    // Verifica se há um símbolo inválido no array_1
    for (let i = 0; i < array_1.length; i++)
    {
        if (array_1[i] < "0" && array_1[i] != "-")
        {
            result_div.innerHTML = "O primeiro número possui um símbolo inválido!";
            return;
        }
        else if (array_1[i] > ":" && array_1[i] < "A")
        {
            result_div.innerHTML = "O primeiro número possui um símbolo inválido!";
            return;
        }
        else if (array_1[i] > "Z" && array_1[i] < "a")
        {
            result_div.innerHTML = "O primeiro número possui um símbolo inválido!";
            return;
        }
        else if (array_1[i] > "z")
        {
            result_div.innerHTML = "O primeiro número possui um símbolo inválido!";
            return;
        }
    }

    // Verifica se há um símbolo inválido no array_2
    for (let i = 0; i < array_2.length; i++)
    {
        if (array_2[i] < "0" && array_2[i] != "-")
        {
            result_div.innerHTML = "O segundo número possui um símbolo inválido!";
            return;
        }
        else if (array_2[i] > ":" && array_2[i] < "A")
        {
            result_div.innerHTML = "O segundo número possui um símbolo inválido!";
            return;
        }
        else if (array_2[i] > "Z" && array_2[i] < "a")
        {
            result_div.innerHTML = "O segundo número possui um símbolo inválido!";
            return;
        }
        else if (array_2[i] > "z")
        {
            result_div.innerHTML = "O segundo número possui um símbolo inválido!";
            return;
        }
    }

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
    letraparaNum(array_1);
    letraparaNum(array_2);
    
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

        // Se ambos os denominadores estiverem vazios
        if (denominador_1 == "" && denominador_2 == "")
        {
            result_div.innerHTML = "Números inválidos!";
            return;
        }
        // Se o denominador_1 estiver vazio
        else if (denominador_1 == "")
        {
            result_div.innerHTML = "Número 1 é inválido!";
            return;
        }
        // Se o denominador_2 estiver vazio
        else if (denominador_2 == "")
        {
            result_div.innerHTML = "Número 2 é inválido!";
            return;
        }

        // Remove os zeros do inicio do denominador_1 e do denominador_2
        while (denominador_1[0] == 0 || denominador_2[0] == 0)
        {
            if (denominador_1[0] == 0)
            {
                denominador_1.shift();
            }
            if (denominador_2[0] == 0)
            {
                denominador_2.shift();
            }
        }

        // Se o denominador_1 e denominador_2 forem compostos somente de zeros
        if (denominador_1 == "" && denominador_2 == "")
        {
            result_div.innerHTML = "Os número 1 e 2 são inválidos (divisão por zero)!";
            return;
        }
        // Se o denominador_1 só for composto de zero(s)
        if (denominador_1 == "")
        {
            result_div.innerHTML = "O número 1 é inválido (divisão por zero)!";
            return;
        }
        // Se o denominador_2 só for composto de zero(s)
        if (denominador_2 == "")
        {
            result_div.innerHTML = "O número 2 é inválido (divisão por zero)!";
            return;
        }

        // Produto dos dois denominadores (M.M.C.)
        var produtoD = [];
        var multiArray1 = [], multiArray2 = [];

        // Caso array_1 ou array_2 forem zeros não precisar fazer o M.M.C.
        if (parseInt(array_2.join(''), base) == 0)
        {
            produtoD = denominador_1;
            multiArray1 = array_1;
            multiArray2.push(0);

        }
        else if (parseInt(array_1.join(''), base) == 0)
        {
            produtoD = denominador_2;
            multiArray1.push(0);
            multiArray2 = array_2;
        }
        else
        {
            produtoD = functionMulti(denominador_1, denominador_2, base, negative);

            // "M.M.C. - divide pelo debaixo(denominador) multiplica pelo de cima(numerador)"
            multiArray1 = functionMulti(array_1, functionDiv(produtoD, denominador_1, base), base, negative);
            multiArray2 = functionMulti(array_2, functionDiv(produtoD, denominador_2, base), base, negative);
        }

        if (typeOperador == "sum")
        {
            memoria_calculo.innerHTML = "Números a somar: " + array_1.join('') + ":" + denominador_1.join('') + " + " + array_2.join('') + ":" + denominador_2.join('');
        }
        else
        {
            memoria_calculo.innerHTML = "Números a subtrair: " + array_1.join('') + ":" + denominador_1.join('') + " - " + array_2.join('') + ":" + denominador_2.join('');
        }
        
        memoria_calculo.innerHTML += "<br></br>Separa o numerador e denominador em dois arrays distintos: <br></br>";
        memoria_calculo.innerHTML += "Numerador1: " + array_1.join('') + " e Denominador1: " + denominador_1.join('');
        memoria_calculo.innerHTML += "<br></br>Numerador2: " + array_2.join('') + " e Denominador2: " + denominador_2.join('');
        memoria_calculo.innerHTML += "<br></br>Calcula o produto dos dois denominadores = " + produtoD.join('');
        memoria_calculo.innerHTML += "<br></br>M.M.C. 1- divide pelo debaixo(denominador) multiplica pelo de cima(numerador): ";
        memoria_calculo.innerHTML += "(" + produtoD.join('') + "/" + denominador_1.join('') + ")*(" + array_1 + ") = " + multiArray1.join('');
        memoria_calculo.innerHTML += "<br></br>M.M.C. 2- divide pelo debaixo(denominador) multiplica pelo de cima(numerador): ";
        memoria_calculo.innerHTML += "(" + produtoD.join('') + "/" + denominador_2.join('') + ")*(" + array_2 + ") = " + multiArray2.join('');
    }

    if (typeOperador == 'sum') {
        if (racional_1 || racional_2)
        {
            memoria_calculo.innerHTML += "<br></br>Somando esses dois números teremos o numerador final: ";
            var numerador = functionSoma(multiArray1, multiArray2, base, negative);
            memoria_calculo.innerHTML += "<br></br>O racional é então = " + numerador.join('') + ":" + produtoD.join('');
            array_result = normRacional(numerador, produtoD, base);
            memoria_calculo.innerHTML += "<br></br>Realizando a normalização deste número racional teremos como resultado final = " + array_result.join('');
        }
        else
        {
            memoria_calculo.innerHTML = "Números a somar: " + array_1.join('') + " + " + array_2.join('');

            array_result = functionSoma(array_1, array_2, base, negative);
        }
    } else if (typeOperador == 'sub') {
        if (racional_1 || racional_2)
        {
            memoria_calculo.innerHTML += "<br></br>Subtraindo esses dois números teremos o numerador final: ";
            var numerador = functionSub(multiArray1, multiArray2, base, negative, type);
            memoria_calculo.innerHTML += "<br></br>O racional é então = " + numerador.join('') + ":" + produtoD.join('');
            array_result = normRacional(numerador, produtoD, base);
            memoria_calculo.innerHTML += "<br></br>Realizando a normalização deste número racional teremos como resultado final = " + array_result.join('');
        }
        else
        {
            memoria_calculo.innerHTML = "Números a subtrair: " + array_1.join('') + " - " + array_2.join('');

            array_result = functionSub(array_1, array_2, base, negative, type);
        }
    }

    // Se o numerador for zero, o resultado final será zero
    if (numerador == 0 && numerador.length == 1)
    {
        result_div.innerHTML = 0;
        return;
    }

    // Converte números >= 10 para sua representação alfabética
    numparaLetra(array_result);

    // Retira os zeros do começo do array
    while(array_result[0] == 0) 
    {
        // Não remover o 0 se só houver ele
        if (array_result.length == 1)
        {
            break;
        }

        array_result.shift();
    }

    var result = array_result.join('')
    result_div.innerHTML = result

    return;
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

    memoria_calculo.innerHTML += "<br></br>Deixando os números com o mesmo tamanho: " + array_1 + " | " + array_2;

    for (let i = 0; i < array_1.length; i++) {
        array_result[i] = array_1[i] + array_2[i]
    }

    memoria_calculo.innerHTML += "<br></br>Somando os números: " + array_1 + " + " + array_2 + " = " + array_result;

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

    memoria_calculo.innerHTML += "<br></br>Se algum valor for maior que a base " + base + ", subtrai a base deste valor e acrescenta 1 ao número de índice anterior = ";
    memoria_calculo.innerHTML += array_result;

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

    if (negative == 3 || negative == 1)
    {
        memoria_calculo.innerHTML += "<br></br>Se o valor for negativo é acrescentado um menos no começo = " + array_result;
    }

    memoria_calculo.innerHTML += "<br></br>O valor final da soma é = " + array_result.join('');

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

    memoria_calculo.innerHTML += "<br></br>Deixando os números com o mesmo tamanho: " + array_1 + " | " + array_2;

    // verificar qual array tem o maior valor
    if (parseInt(array_1.join('')) < parseInt(array_2.join(''))) {
        var aux = array_1
        array_1 = array_2
        array_2 = aux
    }

    memoria_calculo.innerHTML += "<br></br>Verifica qual array tem maior valor numérico = " + array_1;

    // subtraindo valores dos arrays
    for (let i = 0; i < array_1.length; i++) {
        array_result[i] = array_1[i] - array_2[i]
    }

    memoria_calculo.innerHTML += "<br></br>Subtraindo os números: " + array_1 + " - " + array_2 + " = " + array_result;

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

    memoria_calculo.innerHTML += "<br></br>Se algum valor for menor que 0, soma este valor com a base, e subtrai 1 do valor de índice anterior";

    // removendo os 0s desnecessários
    while(array_result[0] == 0) 
    {
        // Não remover o 0 se só houver ele
        // E também não precisa de "-"(menos) se for só um zero, logo pode dar return
        if (array_result.length == 1)
        {
            memoria_calculo.innerHTML += "O valor final da subração é zero(" + array_result + ")";
            return array_result;
        }
        array_result.shift()
    }

    memoria_calculo.innerHTML += "<br></br>Remove os 0s desnecessários = " + array_result;

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

    if (array_result[0] == "-")
    {
        memoria_calculo.innerHTML += "<br></br>Se o número for negativo é acrescentado um menos no começo = " + array_result;
    }

    memoria_calculo.innerHTML += "<br></br>O valor final da subtração é = " + array_result.join('');

    return array_result;
}

// Função que multiplica dois arrays, ambos de determinada base numérica (*Função Provisória*)
function functionMulti(array_1, array_2, base, negative)
{
    var array_result = [], aux1 = "", aux2 = "";

    // Converte números >= 10 para sua representação alfabética
    numparaLetra(array_1);
    numparaLetra(array_2);

    aux1 = array_1.join('');

    aux2 = array_2.join('');

    array_result = parseInt(aux1, base) * parseInt(aux2, base);

    array_result = array_result.toString(base);

    array_result = array_result.split('');

    // for (let i = 0; i < parseInt(aux1, base); i++)
    // {   
    //     array_result = functionSoma(array_1, array_result, base, negative);
    //     if (array_result[0] == "-")
    //     {
    //         array_result.shift();
    //     }
    // }

    // Converte uma letra pra seu valor correspondente numérico
    letraparaNum(array_1);
    letraparaNum(array_2);
    letraparaNum(array_result);

    // transformando os arrays em arrays de números
    array_result.map((value, index) => {
        array_result[index] = parseInt(value)
    })

    return array_result;
}

// Função que divide dois arrays, ambos de determinada base numérica (*Função Provisória*)
function functionDiv(dividendo, divisor, base)
{
    var array_result = [];

    // Converte números em letras para bases >= 10
    numparaLetra(divisor);
    numparaLetra(dividendo);

    var aux1 = "", aux2 = "";

    aux1 = dividendo.join('');

    aux2 = divisor.join('');

    var numero = parseInt(aux1, base) / parseInt(aux2, base);
    numero = numero.toString(base);
    numero = numero.split("");

    // Converte uma letra pra seu valor correspondente numérico
    letraparaNum(numero);

    // transformando os arrays em arrays de números
    numero.map((value, index) => {
        numero[index] = parseInt(value)
    })

    return array_result = numero;
}

// Função que normaliza um número racional (*Função Provisória*)
function normRacional(numerador, denominador, base)
{
    var aux1 = "", aux2 = "", menor = [];
    var array_result = [];
    var negativo = 0;

    if (numerador[0] == "-")
    {
        numerador.shift();
        negativo = 1;
    }

    // Converte números >= 10 para sua representação alfabética
    numparaLetra(numerador);
    numparaLetra(denominador);

    aux1 = numerador.join('');

    aux2 = denominador.join('');

    aux1 = parseInt(aux1, base);

    aux2 = parseInt(aux2, base);

    // Verifica qual número tem menor valor
    if (aux1 > aux2)
    {
        menor = aux2;
    }
    else if (aux1 < aux2)
    {
        menor = aux1;
    }
    else
    {
        menor = aux1;
    }

    for (let i = 2; i <= menor; i++)
    {
        if ((aux1 % i == 0) && (aux2 % i == 0))
        {
            aux1 = (aux1 / i);
            aux2 = (aux2 / i);
            menor /= i;
            
            // Se a fração ainda for divisível pelo mesmo número
            if ((aux1 % i == 0) && (aux2 % i == 0))
            {
                i--;
            }
        }
    }

    aux1 = aux1.toString(base);
    aux2 = aux2.toString(base);

    aux1 = aux1.split('');
    aux2 = aux2.split('');

    // Converte uma letra pra seu valor correspondente numérico
    letraparaNum(aux1);
    letraparaNum(aux2);
    letraparaNum(numerador);
    letraparaNum(denominador);

    // transformando os arrays em arrays de números
    aux1.map((value, index) => {
        aux1[index] = parseInt(value)
    })
    aux2.map((value, index) => {
        aux2[index] = parseInt(value)
    })

    for (let i = 0; i < aux1.length; i++)
    {
        array_result.push(aux1[i]);
    }

    // Se o denominador for um, o resultado será apenas o numerador
    if ((aux2 == 1) && (aux2.length == 1))
    {
        return array_result;
    }

    array_result.push(":");    

    for (let i = 0; i < aux2.length; i++)
    {
        array_result.push(aux2[i]);
    }

    // É adicionado o sinal de menos "-" caso o numerador for negativo
    if (negativo == 1)
    {
        array_result.unshift("-");
    }

    return array_result;
}

// Converte números >= 10 para sua representação alfabética
function numparaLetra(array)
{
    for (let a = 0; a < array.length; a++)
    {
        if (array[a] >= 10 && array[a] <= 35)
        {
            array[a] = String.fromCharCode(array[a] + 55);
        }
    }

    return;
}

// Converte uma letra pra seu valor correspondente numérico
function letraparaNum(array)
{
    // Ex.: a = 10, b = 11, c = 12, etc.
    let auxChar;
    for (let a = 0; a < array.length; a++)
    {
        if (array[a] >= 'a' && array[a] <= 'z')
        {
            auxChar = array[a];
            array[a] = auxChar.charCodeAt(0) - 87;
        }

        if (array[a] >= 'A' && array[a] <= 'Z')
        {
            auxChar = array[a];
            array[a] = auxChar.charCodeAt(0) - 55;
        }
    }

    return;
}