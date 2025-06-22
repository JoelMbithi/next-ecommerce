"use client"
import newRequest from '@/utils/newRequest'
import {useState} from 'react'

  enum MODE {
    LOGIN  ="LOGIN",
    REGISTER = "REGISTER",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
  }

const page = () => {

  const [mode,setMode] = useState(MODE.LOGIN)

    const [form,setForm] = useState({
      username:"",
      password:"",
      email:"",
})
/*   const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailCode,setEmailCode] = useState("") */
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState("")
  const [message,setMessage] = useState("")

  const formTitle = 
  mode === MODE.LOGIN ? "Log in"  
  : mode === MODE.REGISTER ? "Register"
  : mode === MODE.RESET_PASSWORD ? "Reset Your Password"
  : "Verify Your Password"
  

   const buttonTitle = 
  mode === MODE.LOGIN ? "Log in"  
  : mode === MODE.REGISTER ? "Register"
  : mode === MODE.RESET_PASSWORD ? "Reset "
  : "Verify "
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true);
  setError("");
  setMessage("");
      const res = await newRequest.post('/register/create',form)
      console.log(res.data.data)
      setMessage("Registration successful!");
      setForm(
        {
          username:"",
      password:"",
      email:"",
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await newRequest.post('/register/login',form)
      console.log(res.data.data)
      setMessage("Login successful!");
      setForm(
        {
          username:"",
      password:"",
      email:"",
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-[calc(90vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center-center mt-10 justify-center'>
      <form  className='flex flex-col gap-8' action=""
      onSubmit={mode === MODE.LOGIN ? handleLogin : handleRegister}
      >
        <h1 className='text-2xl font-semibold'>{formTitle}</h1>
        {mode === MODE.REGISTER ? (
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>Username</label>
              <input className='ring-2 ring-gray-300 rounded-md p-4' type="text" placeholder='joe' name='username'
              value={form.username}
             onChange={(e) => setForm({ ...form, username: e.target.value })}
   />
             
            </div>
        ):null
        }
        {
          mode !== MODE.EMAIL_VERIFICATION ? (
                <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>Email</label>
              <input className='ring-2 ring-gray-300 rounded-md p-4' type="email" placeholder='joellembithi@gmail.com' name='email' 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
  />
            </div>
          ) : (
                <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>Verification Code</label>
              <input className='ring-2 ring-gray-300 rounded-md p-4' type="text" placeholder='Code' name='emailCode' />
            </div>
          )
        }
 
        {mode === MODE.LOGIN || mode == MODE.REGISTER ? (
            <div className='flex flex-col gap-2'>
             <label className='text-sm text-gray-700'>Password</label>
              <input className='ring-2 ring-gray-300 rounded-md p-4' type="password" placeholder='Enter Your Password' name='password' 
              value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
  />
            </div>
        ) : null}

        {mode === MODE.LOGIN && <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.RESET_PASSWORD)}>Forgot Password?</div>}
        <button className='ring-2 bg-red-400 text-white rounded-md p-2 disabled:bg-pink-200 disabled::cursor-not-allowed' disabled={isLoading}
        type="submit"
     
  >
          { isLoading ? "Loading..." : buttonTitle}</button>
          
          {error && <div className='text-red-600'>{error}</div>}

          {mode === MODE.LOGIN && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.REGISTER)}>
              {"Don't"} have an account? 
              </div>
          )}

          {mode === MODE.REGISTER && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}>
              Have an account?
              </div>
          )}

          {mode === MODE.RESET_PASSWORD && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}>
              Go back to Login?
            </div>
          )}

          {message && <div className='text-green-500' text-sm>{message}</div>}
      </form>
      
    </div>
  )
}

export default page
