"use server"

import { signIn, signOut } from "@/app/auth";

export const handleGithubSignIn = async () => {
    try {
        await signIn("github", {redirectTo: "/"});
    } catch (error) {
        console.error(error);
        throw error;
    }
}
