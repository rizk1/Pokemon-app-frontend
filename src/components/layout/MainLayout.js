import Navbar from "./navbar"

const Mainlayout = ({ children, ...rest }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Mainlayout