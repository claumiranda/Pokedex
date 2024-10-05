const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// El código proporcionado utiliza la Fetch API de JavaScript para realizar solicitudes HTTP. En este caso, está creando un bucle que va del 6 al 41, enviando una solicitud para cada número a una URL específica (reemplazando URL con la URL base de la API del Pokemon). Al recibir la respuesta, convierte los datos a formato JSON y luego llama a la función mostrarPokemon pasando los datos obtenidos.
for(let i = 6; i <= 41; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        // JSON no es un archivo ni un código. Es un formato simple utilizado para almacenar y transportar datos. Es un formato de texto sin formato, que permite un fácil intercambio de datos entre diferentes lenguajes de programación. Se utiliza a menudo para enviar datos entre aplicaciones web y servidores.
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    
    // clasificación
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // pokeId => si el id es de 1 sólo dígito se le agregan 2 ceros x delante, si son 2 dígitos se agrega un cero
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // tarjeta
    const div = document.createElement("div");
    div.classList.add("pokemon");

    // La propiedad innerHTML en JavaScript se utiliza para obtener o establecer el contenido HTML de un elemento, incluyendo sus etiquetas y el contenido de texto interno. Al asignarle un nuevo valor, se reemplaza el contenido existente del elemento. Esta propiedad es útil para modificar o crear contenido dinámico en la página web.
    div.innerHTML = `
      <p class="pokemon-id-back">#${pokeId}</p>       
        <div class="pokemon-imagen">         
           <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
        </div>
           <div class="pokemon-info">
              <div class="nombre-contenedor">          
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
               </div>
                  <div class="pokemon-tipos">${tipos}
                  </div> 
                     <div class="pokemon-stats">
                       <p class="altura stat">${poke.height}m</p>
                       <p class="peso stat">${poke.weight}kg</p>
                     </div>
            </div>
    `;
    listaPokemon.append(div);
    // añade un div a una lista de Pokemon
}

// El código utiliza forEach para agregar un evento de clic a cada botón en botonesHeader. Dentro del manejador de eventos, event.currentTarget.id se utiliza para obtener el ID del botón que fue clicado. Esto permite realizar acciones específicas basadas en el botón que se ha activado.
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

   // vaciar lista HTML
   listaPokemon.innerHTML = "";

    // selección de botón
    for(let i = 6; i <= 41; i++) {
      fetch(URL + i)
          .then((response) => response.json())
          .then(data => {

            if(botonId === "ver-todos") {
              mostrarPokemon(data);
            } else {
                // según clasificación
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
                }
            }           
          })
    }
}))

/* REFERENCIA
 <div class="pokemon">
    <!-- p => número que tiene de fondo -->
    <p class="pokemon-id-back">#025</p>
        <!-- imagen -->
        <div class="pokemon-imagen">
            <!-- PokeApi (pokemon/pikachu)=> sprite => other => official-artwork => copiar link-->
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">
        </div>
           <div class="pokemon-info">
              <div class="nombre-contenedor">
              <!-- p.pokemon-id -->
              <p class="pokemon-id">#025</p>
                <!-- h2.pokemon-nombre -->
                <h2 class="pokemon-nombre">Pikachu</h2>
               </div>
                  <!-- div.pokemon-tipo => para autocompletar -->
                  <div class="pokemon-tipos">
                    <p class="electric tipo">ELECTRIC</p>
                    <p class="fighting tipo">FIGHTING</p>
                  </div> 
                     <div class="pokemon-stats">
                       <p class="altura stat">0,4m</p>
                       <p class="peso stat">6,0kg</p>
                     </div>
        </div>
  </div>
*/ 