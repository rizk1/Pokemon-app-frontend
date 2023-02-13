import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { catchPokemon, changeNamePokemon, ReleasePokemon } from "../services/api"

const PokemonInfo = ({data, PokemonCatch, Call}) => {
    const [PokemonSpecies, setSpecies] = useState({})

    const isPrime = (num) => {
        if (num <= 1) {
            return false;
        }
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    const CatchPokemon = async () => {
        const poke = await catchPokemon({
            pokemon: data.name,
        })
        ModalLoading('Catching Pokemon!', 'Wait a second for pokemon.')

        setTimeout(() => {
            Swal.close()
            if (poke.status === 'success') {
                return Swal.fire({
                    title: 'Congratulations',
                    text: `You catch ${data.name}, Give name the pokemon`,
                    input: 'text',
                    confirmButtonText: 'Save',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    preConfirm: async (name) => {
                        try {
                            const post = await changeNamePokemon({
                                pokemon: data.name,
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

            Swal.fire({
                title: 'Pokemon Run Away!',
                text: 'Better luck next time.',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
        }, 1000);
    }

    const releasePokemon = async () => {
        const get = await ReleasePokemon({pokemon: data.name})
        ModalLoading('Release Pokemon!', 'Please wait a second.')

        setTimeout(() => {
            Swal.close()
            if (isPrime(get.number)) {
                return Swal.fire({
                    title: 'Sweet!',
                    text: 'Pokemon Release!',
                    imageUrl: data?.sprites?.other?.dream_world?.front_default,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                })
            }
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Failed to release pokemon.',
            })
        }, 1000);

    }

    const ModalLoading = (title, text) => {
        Swal.fire({
            title: title,
            text: text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
    }

    useEffect(() => {
        axios.get(data?.species?.url).then(res => {
            setSpecies(res.data)
        }).catch(err => {
            setSpecies({})
        })
    }, [data?.species?.url])

    return (
        <div className="px-10">
            <div className="card card-compact w-96 bg-base-100">
                <div className="card-body">
                    {/* <div className="radial-progress" style={{"--value":70}}>70%</div> */}
                    <h4 className="text-lg">{PokemonSpecies?.flavor_text_entries && PokemonSpecies?.flavor_text_entries[0]?.flavor_text}</h4>
                    <div className="w-full h-40 bg-blue-400 p-5 rounded my-4">
                        {data?.stats?.map((v, k) => {
                            return(
                                <div key={k} className="flex items-center">
                                    <p className="text-white">{v.stat.name}</p>
                                    <progress className="progress w-40" value={v.base_stat} max="100"></progress>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center gap-4 mb-5">
                        {data?.abilities?.map((v, k) => {
                            return(
                                <button key={k} className="btn btn-sm btn-primary">{v.ability.name}</button>
                            )
                        })}
                    </div>
                    <button className="btn btn-secondary" onClick={PokemonCatch?.data ? releasePokemon : CatchPokemon}>{PokemonCatch?.data?.pokemon ? 'Release Pokemon' : 'Catch the Pokemon'}</button>

                    {!PokemonCatch?.data?.pokemon &&
                        <p className="text-center">success probability is 50%</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo