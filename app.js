const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');

const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeTipo = document.querySelector('#tipoPropio');
const pokeAtaque = document.querySelector('#ataquePropio');

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#boton_poke');
const btnPelear = document.querySelector('#combate');
const winnerMensaje = document.querySelector('#winner');
const ganadorPropio = document.querySelector('#ganadorRonda');
const ganadorRival = document.querySelector('#ganadorRonda2');

const ataqueConcatenado = document.querySelector('#ataque');
const tipoConcatenado = document.querySelector('#tipo');

var bandera = 0;
var refrescarPgn = document.querySelector('#refrescar');
const mostrarPop = document.querySelector('#ganador');


const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

const obtenerPokePropio = ()=>{
    const num = input.value;
    bandera = 1;
    
        axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{ // axios llama a la api mediante una URL
    
            return res.data // devuelve la respuesta de los datos del API, then se espera a que responda el resultado
        }).then((res)=>{ // ya teniendo la respuesta de la API, junto con sus datos
            console.log(res);
            imgPoke.src = res.sprites.back_default;
            pokeTipo.innerHTML = res.types[0].type.name;
            namePoke.innerHTML = res.name;
            pokeAtaque.innerHTML = res.stats[0].base_stat;
            btnPelear.style.display = 'block';
            ataqueConcatenado.textContent = 'Ataque: ' + pokeAtaque.innerHTML;
            tipoConcatenado.textContent = 'Tipo: ' + pokeTipo.innerHTML;
        })
}

const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{ // axios llama a la api mediante una URL

        return res.data // devuelve la respuesta de los datos del API, then se espera a que responda el resultado
    }).then((res)=>{ // ya teniendo la respuesta de la API, junto con sus datos
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[0].base_stat;
    })
}

const combate = ()=>{
    
    const ataqueRival = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(pokeAtaque.textContent);

    if(bandera == 1){

        refrescarPgn.style.display = 'block';
        document.querySelector('.contException').classList.add("active");

        if(ataquePropio>ataqueRival){
            winnerMensaje.textContent = 'GANASTE!!!';
            ganadorPropio.textContent = 'Pokemon ganador: ' + namePoke.textContent;
            document.querySelector("#ganador").classList.add("active");
        }else if(ataquePropio == ataqueRival){
            winnerMensaje.textContent = 'EMPATE!!!';
            document.querySelector("#ganador").classList.add("active");
        }else{
            winnerMensaje.textContent = 'PERDISTE!!!';
            ganadorRival.textContent = 'Pokemon ganador: ' + namePoke2.textContent;
            document.querySelector("#ganador").classList.add("active");
        }
        
    }
}

refrescarPgn.onclick = function(){
    location.reload();
}

window.addEventListener('load', obtenerPokeRival);
btnElegir.addEventListener('click', obtenerPokePropio);
btnPelear.addEventListener('click', combate);

winnerMensaje.addEventListener('click',combate);
ganadorPropio.addEventListener('click', combate);
ganadorRival.addEventListener('click',combate);

ataqueConcatenado.addEventListener('click', obtenerPokePropio);
tipoConcatenado.addEventListener('click', obtenerPokePropio);


