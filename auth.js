// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaQDKLlmT3zYC5ww3rxiul_FB7HfviZUA",
  authDomain: "royalstar-d6a4e.firebaseapp.com",
  databaseURL: "https://royalstar-d6a4e-default-rtdb.firebaseio.com",
  projectId: "royalstar-d6a4e",
  storageBucket: "royalstar-d6a4e.firebasestorage.app",
  messagingSenderId: "796910377639",
  appId: "1:796910377639:web:f8de8945e558fb9868d982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
export async function handleLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Store credentials and today's date
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('lastLoginDate', new Date().toDateString());
        return { success: true, user: userCredential.user };
    } catch (error) {
        let errorMessage = "Login failed!";
        switch (error.code) {
            case 'auth/invalid-credential':
                errorMessage = "Invalid email or password!";
                break;
            case 'auth/user-not-found':
                errorMessage = "No account found with this email!";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Too many failed attempts. Try again later!";
                break;
        }
        return { success: false, error: errorMessage };
    }
}

export async function handleRegister(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Store credentials and today's date
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('lastLoginDate', new Date().toDateString());
        return { success: true, user: userCredential.user };
    } catch (error) {
        let errorMessage = "Registration failed!";
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Email already in use!";
                break;
            case 'auth/invalid-email':
                errorMessage = "Invalid email format!";
                break;
            case 'auth/weak-password':
                errorMessage = "Password should be at least 6 characters!";
                break;
        }
        return { success: false, error: errorMessage };
    }
}

export async function handlePasswordReset(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        let errorMessage = "Failed to send reset email!";
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = "Invalid email format!";
                break;
            case 'auth/user-not-found':
                errorMessage = "No account found with this email!";
                break;
        }
        return { success: false, error: errorMessage };
    }
}

export async function handleLogout() {
    try {
        // Clear all stored credentials
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('lastLoginDate');
        
        // Sign out from Firebase
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error: "Failed to sign out" };
    }
}

export function checkAuth(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (callback) {
            callback(user);
        }
    });
}

export function getCurrentUser() {
    return auth.currentUser;
}

// Export auth instance for direct use if needed
export { auth }; 
