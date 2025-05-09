import { useState } from 'react';
import { supabase } from '../supabase/supabase';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);

  const signUp = async ({ email, password, userName }) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      data: { userName },
    });
    if (user) {
      setUser(user);
    }
    return { user, error };
  };

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ // 수정된 부분
      email,
      password,
    });
    if (user) {
      setUser(user);
    }
    return { user, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return error;
  };

  const getUserInfo = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
    return { user, error };
  };

  return { signUp, login, logout, getUserInfo, user };
};
