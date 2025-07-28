// 'use client'

// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       console.log(result.error);
//     } else {
//       router.push("/");
//     }
//   };

//   return (
//    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//   <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//     <h1 className="text-2xl font-semibold mb-6 text-center text-black">Login</h1>
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 text-black cursor-pointer"
//       >
//         Login
//       </button>
//     </form>
//     <div className="mt-4 text-center text-sm text-black">
//       Don't have an account?
//       <button
//         onClick={() => router.push("/register")}
//         className="ml-1 text-blue-600 hover:underline text-black cursor-pointer"
//       >
//         Register
//       </button>
//     </div>
//   </div>
// </div>

//   );
// }

// export default LoginPage;

'use client'

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [providers, setProviders] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            console.log(result.error);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center text-black">
                    Login
                </h1>

                {/* Social Providers */}
                <div className="mt-6 space-y-3 mb-3">
                    {providers &&
                        Object.values(providers)
                            .filter((provider: any) => provider.id !== "credentials")
                            .map((provider: any) => (
                                <button
                                    key={provider.name}
                                    onClick={() =>
                                        signIn(provider.id, {
                                            callbackUrl: "/", // 👈 redirects to home page after login
                                        })
                                    }
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-black hover:bg-gray-100 transition"
                                >
                                    Continue with {provider.name}
                                </button>
                            ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-black">
                    Don't have an account?
                    <button
                        onClick={() => router.push("/register")}
                        className="ml-1 text-blue-600 hover:underline cursor-pointer"
                    >
                        Register
                    </button>
                </div>


            </div>
        </div>
    );
}

export default LoginPage;
