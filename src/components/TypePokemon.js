const TypePokemon = ({type}) => {
    const listType = [
        {type: 'normal', color: 'bg-gray-400'},
        {type: 'fire', color: 'bg-orange-400'},
        {type: 'water', color: 'bg-blue-400'},
        {type: 'grass', color: 'bg-green-400'},
        {type: 'electric', color: 'bg-yellow-400'},
        {type: 'ice', color: 'bg-blue-400'},
        {type: 'fighting', color: 'bg-red-400'},
        {type: 'poison', color: 'bg-purple-400'},
        {type: 'ground', color: 'bg-yellow-400'},
        {type: 'flying', color: 'bg-gray-400'},
        {type: 'psychic', color: 'bg-pink-400'},
        {type: 'bug', color: 'bg-green-400'},
        {type: 'rock', color: 'bg-gray-400'},
        {type: 'ghost', color: 'bg-gray-400'},
        {type: 'dark', color: 'bg-gray-400'},
        {type: 'dragon', color: 'bg-gray-400'},
        {type: 'steel', color: 'bg-gray-400'},
        {type: 'fairy', color: 'bg-gray-400'},
    ]

    const filterType = listType.filter((tp) => {return tp.type === type})

    return (
        <div className={`badge capitalize text-[#000] ${filterType.length && filterType[0].color}`}>{type}</div>
    )
}

export default TypePokemon