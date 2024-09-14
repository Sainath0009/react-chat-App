import Chat from "./Components/chat/Chat";
import List from "./Components/list/List";
import Detail from "./Components/detail/Detail";
import Login from "./Components/login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import { auth } from "./lib/firebase";
import Notifiaction from "./Components/notifiaction/Notifiaction";


function App() { 

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null); 
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser); 

  if (isLoading) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {currentUser ? ( 
        <div className="container">
          <List />
          <Chat />
          <Detail />
        </div>
      ) : (
        <Login />
      )}
      <Notifiaction/>
    </div>
  );
}

export default App;
