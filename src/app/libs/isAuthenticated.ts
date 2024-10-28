"use server"

import { auth } from "@/app/auth"

export const isAuthenticated = async () => {
    const session = await auth();
    if(session){
        return true;
    }
    return false;
}