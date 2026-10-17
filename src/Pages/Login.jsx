import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthStore } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    }=useForm();

    const {setUser}=useContext(AuthStore);

    const navigate=useNavigate();
  
    const submitHandler=(data)=>{
     
        const users=JSON.parse(localStorage.getItem("users"))||[];

       const exist= users.find((user)=>{
             return user.email.trim().toLowerCase()===data.email.trim().toLowerCase();
        })

        if(!exist){
            toast.error("User is not registered");
            reset();
            return ;

        }

        if(exist.password!=data.password){
            toast.error("Invalid or Wrong Password");
            return;
        }

        localStorage.setItem("currUser",JSON.stringify(exist));
        setUser(exist);
        navigate('/main');
        toast.success("User Logged In Successfully");

        reset();
    }

  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0b1728] p-8 shadow-2xl">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-3xl">🚀</div>
          <h1 className="text-2xl font-bold">
            Welcome back!
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Continue your interview preparation journey.
          </p>
        </div>

        {/* Login Form */}
        <form 
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              {...register('email',{
                required:true,
                message:"Email is required",
                pattern:{
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                 message: "Please enter a valid email address",
                }
              })

              }
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              {...register('password',{
                required:true,
                message:"Password is required",
                minLength:{
                    value:6,
                    message:"Password must contain at least 6 characters"
                }
              })}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>
           {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        

          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400 cursor-pointer">
          Don't have an account?{" "}
          <a 
          
          onClick={()=>{navigate('/')}}
          className="font-medium text-violet-400 hover:text-violet-300">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
