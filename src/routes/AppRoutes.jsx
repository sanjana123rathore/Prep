import { createBrowserRouter, RouterProvider } from "react-router"
import ProtectedRoutes from "../utils/ProtectedRoutes"
import Register from "../Pages/Register"
import Login from "../Pages/Login"
import PublicRoutes from "../utils/PublicRoutes"
import DashboardLayout from "../component/dashboardLayout"
import Dashboard from "../Pages/Dashboard"
import Setting from "../Pages/Setting"
import Profile from "../Pages/Profile"
import Problems from "../Pages/Problems"
import Progress from '../Pages/Progress'


const AppRoutes = () => {
 
 const router=createBrowserRouter([
    {
    path:"/",
    element:<PublicRoutes/>,
    children:[
        {
            path:"",
            element:<Register/>
        },
        {
            path:"login",
            element:<Login/>
        }
    ]
 },
 {
    path:"/",
    element:<ProtectedRoutes/>,
    children:[
        {
            path:"/main",
            element:<DashboardLayout/>,
            children:[
                {
                    // path:'dashboard',
                    index:true,
                    element:<Dashboard/>
                },
                {
                    path:'setting',
                    element:<Setting/>
                },
                {
                    path:'profile',
                    element:<Profile/>
                },
                {
                    path:'problems',
                    element:<Problems/>
                },
                {
                    path:'progress',
                    element:<Progress/>
                }
            ]


        }
    ]
 }
]
)

 return <RouterProvider router={router}/>


}

export default AppRoutes