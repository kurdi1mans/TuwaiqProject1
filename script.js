const P = new Pokedex.Pokedex();

let pokemonList = null;
let pokemonDetails = null;


const fetchData = async () =>
{
    pokemonList = await P.getPokemonsList();
    pokemonList = pokemonList.results.slice(0,100);
	pokemonDetails = await Promise.all(
		pokemonList.map(async (pok) => await P.getPokemon(pok.name))
	);
}

const generateView = async() =>
{
	let htmlStr = "";

	const rowColumnCount = 8;
	
	let columnCounter = 0;
	for (let i = 0; i < pokemonList.length; i++)
	{
		
		htmlStr+=
				`<div class="col-auto mb-1 d-flex">
						<div class="card" style="width: 10rem;">
						<img src="${pokemonDetails[i].sprites.front_default}" class="card-img-top" alt="...">
						<div class="card-body">
						<h5>${pokemonList[i].name}</h5>
						</div>
					</div>	
				</div>`;
		columnCounter++;
	
	}


	const container = document.getElementById('CardsContainer');
	container.innerHTML = htmlStr;
   
}

const run = async () =>
{
	await fetchData();
	await generateView();
}

run();

