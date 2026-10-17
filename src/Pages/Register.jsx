import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthStore } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";

const Register = () => {
 
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset

    }=useForm();

    const {setUser,registeredUser,setRegisteredUser}=useContext(AuthStore);

    const navigate=useNavigate();

    const submitHandler =(data)=>{
        let users=JSON.parse(localStorage.getItem("users"))||[];

       const exist= users.some((user)=>{
          return user.email.trim().toLowerCase()===data.email.trim().toLowerCase();
        })

        if(exist){
           console.log("user already exist");
           toast.error("User already Registered");
           reset();
           return;
        }

        if(data.password!==data.confirm_password){
            toast.error("Invalid password");
            reset();
            return;
        }
           const updatedUsers=[...users,data];

           setRegisteredUser(updatedUsers);

           localStorage.setItem("users",JSON.stringify(updatedUsers))

        
           toast.success("User Registered Successfully")
           navigate('/login');
   
        reset()
    }

  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0b1728] p-8 shadow-2xl">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-3xl">🚀</div>
          <h1 className="text-2xl font-bold">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Start tracking your interview preparation.
          </p>
        </div>

        {/* Register Form */}
        <form
         onSubmit={handleSubmit(submitHandler)}
         className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              {...register('name',{
                required:true,
                message:"Name is required"
              })}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          {errors.name && <div className="text-red-500">{errors.name.message}</div>}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              {...register('email',{
                 required:true,
                 message:"Email is required",
                 pattern: {
                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                 message: "Please enter a valid email address",
                },
              })}
              type="email"
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
                {...register('password',{
                required:true,
                message:"password is required",
                minLength:{
                    value:6,
                    message:"Password must contain minimum 6 characters"
                }
              })}
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>
           {errors.password && <div className="text-red-500">{errors.password.message}</div>}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>
            <input
               {...register('confirm_password',{
                required:true,
                message:"password is required",
                minLength:{
                    value:6,
                    message:"Password must contain minimum 6 characters"
                },
                validate: (value, formValues) =>
               value === formValues.password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>
           {errors.confirm_password && <div className="text-red-500">{errors.confirm_password.message}</div>}


          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-violet-400 hover:text-violet-300">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

