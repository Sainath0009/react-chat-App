import Chat from "./Components/chat/Chat";
import List from "./Components/list/List";
import Detail from "./Components/detail/Detail";
import Login from "./Components/login/Login";
import Notifiaction from "./Components/notifiaction/Notifiaction2";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import { auth } from "./lib/firebase";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if(user) {
        fetchUserInfo(user.uid);
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  

  if (isLoading) return <div className="Loading"></div>
  return (
    <div>
      { currentUser ? (
        <div className="container">
          <List />
          <Chat />
          <Detail />
        </div>
      ) : (
        <Login />
      )}
      <Notification /> 
    </div>
  );
}

export default App;
