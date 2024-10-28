import React from 'react'
import { isAuthenticated } from "@/app/libs/isAuthenticated";
import SignOutButton from './SignOutButton';
import Link from 'next/link';

async function Navbar() {
    const isAuth = await isAuthenticated();


    return (
        <header className="py-2">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className=" font-semibold flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                            FormGenius 🧠
                        </Link>
                    </div>


                    <div className=" lg:ml-auto lg:flex lg:items-center lg:space-x-10">
                        {
                            isAuth ?
                                <>
                                  <SignOutButton/>
                                </>
                                : null


                        }

                    </div>
                </div>

            </div>
        </header>

    )
}

export default Navbar