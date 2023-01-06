import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <main class="min-h-[75vh] h-auto w-full flex flex-col justify-center items-center">
      <h1 class="text-9xl font-extrabold text-red-500 tracking-widest">404</h1>
      <div class="bg-black px-2 text-sm text-white rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </a>
      </button>
      <h4 className="mt-4">
        Design and code of this 404 page directly taken from orignal creator "M
        Atif" from{' '}
        <a
          className="underline text-blue-400"
          href="https://github.com/atif0075"
        >
          GitHub
        </a>
      </h4>
    </main>
  );
}
export default ErrorPage;
