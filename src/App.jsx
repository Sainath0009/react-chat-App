import Chat from "./Components/chat/Chat";
import List from "./Components/list/List";
import Detail from "./Components/detail/Detail";
import Login from "./Components/login/Login";
import Notifiaction from "./Components/notifiaction/Notifiaction2";





function App() {


  const user = true;
  return (
    <div>
      {user ? (
      
        <div  className='container'>
          <List />
          <Chat />
          <Detail />
        

        </div>



      ) : (

        <Login />

      )}
      <Notifiaction />


    </div>
  );
}

export default App