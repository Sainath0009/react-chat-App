import { create } from 'zustand';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("No UID provided. Setting currentUser to null and isLoading to false.");
      set({ currentUser: null, isLoading: false });
     
    }
    try {
      const docRef = doc(db, "users", uid); // Make sure 'users' is the correct collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data found:", docSnap.data());
        set({ currentUser:docSnap.data(), isLoading: false });
      } else {
        console.log("No user data found.");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  }
}));
