import Quote from "../components/Quote";

const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Create an account</h2>
          <p className="text-gray-600 text-md">
            Already have an account? <a href="/signin">Login</a>
          </p>
          <div className="flex flex-col gap-4 mt-6 w-1/2">
            <p className="font-semibold">Username</p>
            <input type="text" placeholder="Enter your username" />
            <p className="font-semibold">Email</p>
            <input type="email" placeholder="Enter your email" />
            <p className="font-semibold">Password</p>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="bg-gray-900 text-white w-96 rounded-md h-10 cursor-pointer mt-5 hover:bg-gray-800 font-semibold">
            Sign Up
          </button>
        </div>
        <Quote />
      </div>
    </>
  );
};

export default Signup;
