import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../../context/useAuth";
import AppLayout from "../layout/AppLayout";

const ProtectedRoutes = () => {

    const { isAuthenticated, loading } = useAuth();

    if(loading){
        return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="animate-spin" />
        </div>
        )
    }

    return (
        isAuthenticated ? (
            <AppLayout>
                <Outlet />
            </AppLayout>
        ) : (
            <Navigate to='/login' />
        )
    )

}

export default ProtectedRoutes;