import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function WebRoute({ children, ...rest }) {

    return (
        <>
            <Navbar />
            <div className="pt-12">
                <Outlet />
            </div>
        </>
    )
}