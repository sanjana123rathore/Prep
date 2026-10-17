import { createBrowserRouter, RouterProvider } from "react-router.jsx"
import ProtectedRoutes from "../utils/ProtectedRoutes.jsx"
import Register from "../Pages/Register.jsx"
import Login from "../Pages/Login.jsx"
import PublicRoutes from "../utils/PublicRoutes.jsx"
import Dashboard from "../Pages/Dashboard.jsx"
import DashboardLayout from "../component/dashboardLayout.jsx"
import Setting from "../Pages/Setting.jsx"
import Profile from "../Pages/Profile.jsx"
import Problems from "../Pages/Problems.jsx"
import Progress from '../Pages/Progress.jsx'


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