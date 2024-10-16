/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoTelefone = formulario.querySelector("#telefone");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Ativação da mascara para telefone e CEP */

$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");

/* Capturando o clique no botão Buscar */
botaoBuscar.addEventListener("click", async function(){
    /* Verificando se o cep NÃO TEM 9 dígitos */   
    if( campoCep.value.length !== 9 ){
        // Informar o usuário sobre o erro
        mensagemStatus.textContent = "Digite um CEP válido";
        mensagemStatus.style.color = "purple";

        // Parar completamente a execução do script
        return;
    }

    /* Guardando o valor do cep digitado */
    let cepDigitado = campoCep.value;
    console.log(cepDigitado);    
    
    /* AJAX - Asyncronous JavaScript And XML
    Técnica de comunicação assíncrona (transmissão, recebimento) de dados muito usada entre sistemas e tecnologias diferentes. */
    
    // Etapa 1: preparar a url contendo o CEP a ser buscado
    let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;
    console.log(url);    

    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);
    console.log(resposta);    

    // Etapa 3: extrair os dados do retorno/resposta
    const dados = await resposta.json();
    console.log(dados);    

    // Etapa 4: lidar com os dados (em caso de erro e sucesso)
    if ( "erro" in dados ) { 
        mensagemStatus.innerHTML = `CEP Inexistente`;
        mensagemStatus.style.color = "red";
    } else {
        mensagemStatus.innerHTML = `CEP Encontrado`;
        mensagemStatus.style.color = "blue";
        
        const campos = formulario.querySelectorAll(".campos-restantes");
        
        //Loop/Laço de repetição para acessar CADA campo selecionado e remover a classe fazendo com que cada campo volte a aparecer
        for (const campo of campos) {
            campo.classList.remove("campos-restantes");

        }

        /* Atribuir os dados para cada campo  */

        // Colocar Logradouro como valor do campo endereço
        campoEndereco.value = dados.logradouro;

        // Colocar o bairro como valor do campo Bairro
        campoBairro.value = dados.bairro;

        // Colocar a localidade como valor do campo cidade 
        campoCidade.value  = dados.localidade;
        
        // Colocar a UF como valor do campo estado
        campoEstado.value = dados.uf;

    }    

}); 

// final do evento do botão



/* Código Formspree */
var form = document.getElementById("my-form");
  
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado pelo contato!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Algo de errado aconteceu, tente mais tarde! "
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Algo deu errado 🤦‍♂️"
  });
}
form.addEventListener("submit", handleSubmit)