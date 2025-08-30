import React from "react";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Left Section */}
      <div className="relative w-1/2 bg-indigo-600 flex flex-col justify-between items-center text-white py-10 px-6 clip-diagonal">
        {/* Logo */}
        <div className="w-full flex justify-start">
          <img src="/src/logo.png" alt="Logo" className="w-24 h-24" />
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-end">
          <h1 className="text-7xl font-bold text-center">BASE</h1>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-8 pb-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
              alt="GitHub"
              className="w-8 h-8 cursor-pointer invert"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg"
              alt="Twitter"
              className="w-8 h-8 cursor-pointer invert"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-8 h-8 cursor-pointer invert"
            />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
              alt="Discord"
              className="w-8 h-8 cursor-pointer invert"
            />
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl bg-white p-12 rounded-xl shadow-lg">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-600 mb-6">Sign in to your account</p>

          {/* Social Login */}
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center text-gray-700 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button className="flex-1 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center text-gray-700 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-gray-900"
                placeholder="johndoe@gmail.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-gray-900"
                placeholder="••••••••"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={onLogin}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 font-medium hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>

      {/* Custom CSS for diagonal line */}
      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 85% 0, 75% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};
