import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import CardList from "../components/CardList"
import { getListPokemon } from "../services/api"


const ListPokemon = () => {
    const [Pokemons, setPokemons] = useState([])
    const [NextPage, setNextPage] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [Params, setParams] = useState({
        limit: 16,
    })
    const observer = useRef()

    const lastOrderData = useCallback(node => {
        if (isLoad) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                getNextPage()
            }
        })
        if (node) observer.current.observe(node)
    })

    const getPokemons = async () => {
        setIsLoad(true)

        let data = await getListPokemon(Params)
        setPokemons(data.results)
        setIsLoad(false)

        if (data.next) {
            setNextPage(data.next)
            setHasMore(true)
            return
        }
        setNextPage(null)
    }

    const getNextPage = async () => {
        if (NextPage) {
            setIsLoad(true)
            const data = await axios.get(NextPage)
            setPokemons([...Pokemons, ...data.data.results])
            setIsLoad(false)

            if (data.data.next) {
                setNextPage(data.data.next)
                setHasMore(true)
                return
            }

            setNextPage(null)
            setHasMore(false)
        }
    }

    useEffect(() => {
        getPokemons()
    }, [])

    return(
        <div className="bg-base-200 min-h-screen p-8">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {Pokemons?.length ? 
                    Pokemons?.map((v, k) => {
                        if (Pokemons.length === k + 1) {
                            return (
                                <div key={k} ref={lastOrderData}>
                                    <CardList pokemonName={v.name} btnDetail={true} />
                                </div>
                            )
                        }

                        return (
                            <div key={k}>
                                <CardList pokemonName={v.name} btnDetail={true} />
                            </div>
                        )
                    })
                : ''
                }                

            </div>
            
        </div>
        
    )
}

export default ListPokemon