import supabase from '../supabase-client/supabase-client.js';

const signUp = async (email, password) => {
  try {
    const { data: user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error signing up:', error.message);
      throw new Error(error.message);
    }

    console.log('User signed up successfully:', email);
    return user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw new Error(error.message);
  }
};

const signIn = async (email, password) => {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error.message);
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw new Error(error.message);
  }
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw new Error(error.message);
  }
};

const isLoggedIn = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    throw new Error(error.message);
  }
};

export default {
  signUp,
  signIn,
  signOut,
  isLoggedIn,
};
