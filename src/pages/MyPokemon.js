import { useEffect, useState } from "react"
import CardList from "../components/CardList"
import { listCatchPokemon } from "../services/api"


const MyPokemon = () => {
    const [Pokemons, setPokemons] = useState([])

    const getPokemons = async () => {
        const data = await listCatchPokemon()
        setPokemons(data.data)
    }

    useEffect(() => {
        getPokemons()
    }, [])

    return(
        <div className="bg-base-200 min-h-screen p-8">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {Pokemons.length ? 
                    Pokemons.map((v, k) => {
                        return (
                            <div key={k}>
                                <CardList pokemonName={v.pokemon} PokemonCatch={v} name={v.pokemon_name} btnDetail={true} />
                            </div>
                        )
                    })
                : ''
                }                

            </div>
            
        </div>
        
    )
}

export default MyPokemon