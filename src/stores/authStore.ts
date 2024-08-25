import { writable } from "svelte/store";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
}

const initialState: AuthStore = {
  user: null,
  loading: true,
};

function convertSupabaseUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    username: supabaseUser.user_metadata.username || "",
    email: supabaseUser.email || "",
  };
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthStore>(initialState);

  return {
    subscribe,
    setUser: (supabaseUser: SupabaseUser | null) =>
      update((state) => ({
        ...state,
        user: supabaseUser ? convertSupabaseUser(supabaseUser) : null,
      })),
    setLoading: (loading: boolean) =>
      update((state) => ({ ...state, loading })),
    signOut: async () => {
      await supabase.auth.signOut();
      set(initialState);
    },
  };
}

export const authStore = createAuthStore();

// Monitor authentication state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Supabase auth event:", event);
  authStore.setUser(session?.user || null);
  authStore.setLoading(false);
});

// check session on initial load
supabase.auth.getSession().then(({ data: { session } }) => {
  authStore.setUser(session?.user || null);
  authStore.setLoading(false);
});
