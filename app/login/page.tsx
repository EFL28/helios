"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import AppleIcon from "../icons/AppleIcon";
import GoogleIcon from "../icons/GoogleIcon";
import QuinisindicLogo from "../icons/QuinisindicLogo";
// import { FcGoogle } from 'react-icons/fc';
// import { FaApple } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-[#272727]">
      <div className="max-w-md w-full space-y-4 p-8 bg-white dark:bg-[#272727] rounded-lg g my-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <QuinisindicLogo className="h-24 w-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-secondary">Iniciar sesión</h2>
        </div>

        <div className="flex flex-col space-y-4 justify-center">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <GoogleIcon className="h-6 w-6" />
            <span>Iniciar sesión con Google</span>
          </button>
          <button
            onClick={() => signIn("apple")}
            className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <AppleIcon className="h-6 w-6 text-black" />
            <span>Iniciar sesión con Apple</span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400 flex items-center justify-center">
            O
          </span>
          <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#272727] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors duration-200"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#272727] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors duration-200"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 
              ${
                !email || !password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              }`}
          >
            Iniciar sesión
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link
              href="/signup"
              className="font-medium text-secondary hover:text-secondary/80 transition-colors duration-200"
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
