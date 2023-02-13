import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-lg fixed z-[999]">
            <div className="flex-1">
                <img src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt="logo" />
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/my-pokemon'}>My Pokemon</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar