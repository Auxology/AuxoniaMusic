import supabase from "@/utils/supabase";
import {redirect} from "@tanstack/react-router";


export async function isAuthenticated() {
    const {data:userData, error:userError} = await supabase.auth.getUser();
    const {data: sessionData, error:sessionError} = await supabase.auth.getSession();

    if(userError || sessionError) {
        console.error("Error fetching user:", userError || sessionError);
        return redirect({to: "/"})
    }

    if(userData.user === null || sessionData.session === null) {
        return redirect({to: "/"})
    }

    console.log("User is authenticated:", userData.user);
    console.log("Session is valid:", sessionData.session);

    // After an hour session.providerToken is undefined for security reasons
    // Which make is it impossible to call spotify API,
    // So we need to log out user also for security reasons

    if(sessionData.session.provider_token === undefined) {
        await supabase.auth.signOut();
    }


    return {
        userData,
        sessionData,
        isAuthenticated: true,
    };
}

// This function is the same as isAuthenticated
// Only difference is that it does not redirect user
// It just returns the authentication status
export async function isNotAuthenticated() {
    const {data:userData, error:userError} = await supabase.auth.getUser();
    const {data: sessionData, error:sessionError} = await supabase.auth.getSession();

    // Temporary fix for the error
    if(userError || sessionError) {
        return {isAuthenticated: false};
    }

    if(userData.user === null || sessionData.session === null) {
        return {isAuthenticated: false};
    }

    return {isAuthenticated: true};
}