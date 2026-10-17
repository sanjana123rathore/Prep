import './index.css';
// import Register from './Pages/Register';
// import Login from './Pages/Login'
// import DashboardLayout from './component/DashboardLayout';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div className="bg-red-500">
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <DashboardLayout /> */}
      <AppRoutes/>
    </div>
  )
}

export default App