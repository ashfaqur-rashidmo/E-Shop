import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config"; 
const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
    // Optional: redirect to  page or show message
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

<button onClick={handleLogout}>Logout</button>
