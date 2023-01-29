import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalUtility } from '../Store/Utility/Utility.context';

import Swal from 'sweetalert2';

const USER_EMAIL = process.env.REACT_APP_USER_EMAIL;
const USER_PASSWORD = process.env.REACT_APP_PASSWORD;

function SignInPage() {
  const { setLogin, setLogout } = useGlobalUtility();
  const [credential, setCredential] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useNavigate();

  const handleFormChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const signIn = (e) => {
    e.preventDefault();
    if (
      credential.email === USER_EMAIL &&
      credential.password === USER_PASSWORD
    ) {
      setLogin();
      console.log('Yes, you are logged in');
      setCredential({ email: '', password: '' });
      redirect('/');
    } else {
      setLogout();
      setCredential({ email: '', password: '' });
      Swal.fire({
        title: 'Error',
        text: 'Invalid Credentials',
      });
      return;
    }
  };

  return (
    <>
      <section className="min-h-[70vh] h-auto">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="hidden lg:block lg:w-6/12 mb-12 ">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            <div className="mx-auto w-8/12 md:6/12 lg:w-5/12 lg:ml-20">
              {/* <p className="font-bold text-red-300">
                Login email: user@gmail.com
              </p>
              <p className="font-bold text-red-300 mb-2">
                Login password: 123456
              </p> */}
              <h1 className="text-4xl pb-4 font-bold">Admin Log-in</h1>
              <form onSubmit={signIn}>
                <div className="mb-6">
                  <input
                    onChange={handleFormChange}
                    name="email"
                    value={credential.email}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    onChange={handleFormChange}
                    name="password"
                    value={credential.password}
                    type={`${showPassword ? 'text' : 'password'}`}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-900 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>

                <div class="flex justify-between items-center mb-6 mt-2">
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                    >
                      Show Password
                    </label>
                  </div>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  className="px-7 py-3 bg-blue-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  //   style="background-color: #3b5998"
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-3.5 h-3.5 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                  Continue with Facebook
                </a>
                <a
                  className="px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                  //   style="backGround-color: #55acee"
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-3.5 h-3.5 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                    />
                  </svg>
                  Continue with Twitter
                </a>
              </form>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <Link
                  to="/signup"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  {' '}
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignInPage;
