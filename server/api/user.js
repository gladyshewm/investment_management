import supabase from "../supabase/supabase.js";

const signUp = async (email, password) => {
    try {
        const { user, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
            }
        );
        if (error) throw error;

        console.log('User signed up successfully:', email);
    } catch (error) {
        console.error('Error signing up:', error.message);
        throw error;
    }
}

const signIn = async (email, password) => {
    try {
        const { user, error } = await supabase.auth.signInWithPassword(
            {
                email,
                password,
            }
        );
        if (error) throw error;
    } catch (error) {
        console.error('Error signing in:', error.message);
        throw error;
    }
}

const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error('Error signing out:', error.message);
        throw error;
    }
}

const isLoggedIn = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Error getting user:', error.message);
        throw error;
    }
}

export default {
    signUp,
    signIn,
    signOut,
    isLoggedIn
};