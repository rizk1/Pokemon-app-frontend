import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { changeNamePokemon, getDetailPokemon } from "../services/api"
import PokemonInfo from "./PokemonInfo"
import TypePokemon from "./TypePokemon"

const CardList = ({PokemonDetail, PokemonCatch, pokemonName, btnDetail, width, Call}) => {
    const [DetailPokemon, setDetailPokemon] = useState({})

    const getDetail = async () => {
        const resData = await getDetailPokemon(pokemonName)
        setDetailPokemon(resData)
    }

    const updateName = async () => {
        return Swal.fire({
            title: 'Change Name Pokemon!',
            text: `Input new name for pokemon.`,
            input: 'text',
            required: 'true',
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: async (name) => {
                if (!name) {
                    Swal.showValidationMessage(
                      '<i class="fa fa-info-circle"></i> Please input new Pokemon name'
                    )
                }
                try {
                    const post = await changeNamePokemon({
                        pokemon: DetailPokemon?.name,
                        pokemon_name: name
                    })

                    return post
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: `Success`,
                }).then(() => {
                    Call(true)
                })
            }
        })
    }

    useEffect(() => {
        if (pokemonName) getDetail()
        if (PokemonDetail) setDetailPokemon(PokemonDetail)
    }, [PokemonDetail, pokemonName])

    return (
        <>
            <div className={`card ${width ? width : 'w-auto'} bg-base-100 shadow-xl`}>
                <figure className="px-10 pt-10">
                    {btnDetail ? 
                        DetailPokemon?.sprites?.front_default ?
                            <img src={DetailPokemon?.sprites?.front_default} alt="Shoes" className="rounded-xl" />
                        : <div style={{height: '96px'}}></div>
                    :   DetailPokemon?.sprites?.other ?
                            <img src={DetailPokemon?.sprites?.other?.dream_world?.front_default} alt="Shoes" className="rounded-xl" />
                        : <div style={{height: '96px'}}></div>
                    }
                </figure>
                <div className="card-body items-center text-center">
                    {PokemonCatch?.pokemon_name ?
                        <h2 className="card-title capitalize text-[24px]">{PokemonCatch?.pokemon_name}</h2>
                        : <div className="h-[28px]"></div>
                    }
                    <h3 className={`card-title capitalize ${PokemonCatch?.pokemon_name ? 'text-[14px]' : ''}`}>{DetailPokemon?.name}</h3>
                
                    <div className="flex">
                        {DetailPokemon?.types?.length ? 
                            DetailPokemon?.types?.map((v, k) => {
                                return (
                                    <div className="my-2" key={k}><TypePokemon type={v.type.name} /></div>
                                )
                            })
                        : ''
                        }
                    </div>
                    
                    {btnDetail ?
                        <div className="card-actions">
                            <Link to={`/pokemon/${DetailPokemon?.name}`} className="btn btn-primary">Detail</Link>
                        </div>
                    
                    : ''}
                    {PokemonCatch && !btnDetail ? 
                        <button className="btn btn-sm btn-primary" onClick={updateName}>{PokemonCatch?.pokemon_name ? 'Rename' : 'Give Name'}</button>
                    : ''
                    }
                </div>
            </div>  
        </>
    )
}

export default CardList