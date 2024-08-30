import { create } from 'zustand';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  fetchUserInfo: async (uid) => {
    console.log("fetchUserInfo called with uid:", uid); 
    if (!uid) {
      console.log("No UID provided. Setting currentUser to null and isLoading to false.");
      return set({ currentUser: null, isLoading: false });
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("Document snapshot:", docSnap.exists()); 

      if (docSnap.exists()) {
        console.log("User data found:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No user data found. Setting currentUser to null.");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
