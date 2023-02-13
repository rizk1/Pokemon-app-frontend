import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardList from "../components/CardList"
import PokemonInfo from "../components/PokemonInfo"
import { detailCatchPokemon, getDetailPokemon } from "../services/api"

const DetailPokemon = () => {
    const {pokemon} = useParams()
    const [PokemonDetail, setPokemonDetail] = useState({})
    const [PokemonCatch, setPokemonCatch] = useState({})

    const Call = (bool) => {
        if (bool) {
            getPokemonCatch(PokemonDetail.name)
        }
    }

    const getPokemonCatch = async (name) => {
        try {
            const get = await detailCatchPokemon(name)
            setPokemonCatch(get)
        } catch (error) {
            setPokemonCatch({})
        }
    }

    const getDetail = async () => {
        const resData = await getDetailPokemon(pokemon)
        setPokemonDetail(resData)
        getPokemonCatch(resData.name)
    }

    useEffect(() => {
        getDetail()
    }, [])
    
    return (
        <>
            <div className="p-6 flex-row justify-center">
                <div className="flex justify-center">
                    <CardList PokemonDetail={PokemonDetail} PokemonCatch={PokemonCatch.data} Call={Call} width={'lg:w-80 md:w-60 w-auto'}/>
                    <PokemonInfo data={PokemonDetail} PokemonCatch={PokemonCatch} Call={Call} />
                </div>
                <div className="flex justify-center overflow-x-auto mt-10">
                    <table className="table w-3/5">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Move</th>
                                {/* <th width="10%"></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {PokemonDetail?.moves?.map((v, k) => {
                                return (
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{v.move.name}</td>
                                        {/* <td><button className="btn btn-md btn-primary">Detail</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DetailPokemon