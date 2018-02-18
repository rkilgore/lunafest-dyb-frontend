import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class BaseAuthService {
    constructor(private afAuth: AngularFireAuth) { }
    
    public attemptLogin(email: string, password: string): Promise<firebase.User> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    
    public logout(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc Returns an authenticated user's unique Google ID.
     * @returns {Promise<string>}
     */
    public uniqueID(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (!user) reject(null);
                else resolve(user.uid);
            });
        });
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc Returns an authenticated user object.
     * @returns {Promise<firebase.User>}
     */
    public user(): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (!user) reject(null);
                else resolve(user);
            });
        });
    }
}


