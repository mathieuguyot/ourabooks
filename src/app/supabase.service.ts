import { Injectable, NgZone } from "@angular/core";
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User
} from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../environement";

export interface Profile {
    id?: string;
    username: string;
    website: string;
    avatar_url: string;
}

@Injectable({
    providedIn: "root"
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private ngZone: NgZone) {
        this.supabase = this.ngZone.runOutsideAngular(() => createClient(supabaseUrl, supabaseKey));
    }

    isLoggedIn(): Promise<boolean> {
        return this.supabase.auth
            .getUser()
            .then((resp) => {
                return resp.data.user !== null;
            })
            .catch(() => false);
    }

    signUp(email: string, password: string) {
        return this.supabase.auth.signUp({
            email,
            password
        });
    }

    signIn(email: string, password: string) {
        return this.supabase.auth.signInWithPassword({ email, password });
    }

    signOut() {
        return this.supabase.auth.signOut();
    }
}
