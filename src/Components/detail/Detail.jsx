import "./detail.css"

const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Baburao Ganpatrao Apte</h2>
        <p>Lorem ipsum dolor sit amet!</p>

      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
           <div className="photoItem">
              <div className="photoDetail">
                <img src="https://th.bing.com/th/id/OIP.zxlZp_gRWTtHyAKlZey7_AHaFj?w=222&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7  " alt="" />
                <span>photo_20242.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://th.bing.com/th/id/OIP.R3j6ijMbVfY0kXTnRV2hVwAAAA?w=223&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                <span>photo_20242.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://th.bing.com/th/id/OIP.oxvvPGdpqLZuDYdH7iQY2wHaF7?w=231&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                <span>photo_20242.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem"> 
              <div className="photoDetail">
                <img src="https://th.bing.com/th/id/OIP.Qj0e9vtyZleciz4MuM06iwHaEH?w=292&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                <span>photo_20242.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>

          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt=""  />
          </div>
        </div>
        <button>Block User</button>


      </div>
    </div>
  )
}

export default Detail