import React, { useEffect, useState } from "react";
import ArtistSearch from "./ArtistSearch";

function UserLog() {
  const id = process.env.REACT_APP_CLIENT_ID;
  const uri = process.env.REACT_APP_REDIRECT_URI;
  const auth = process.env.REACT_APP_AUTH_ENDPOINT;
  const res = process.env.REACT_APP_RESPONSE_TYPE;

  const [token, setToken] = useState("");

  //set token
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      console.log(token);
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  return (
    <div className="userlog">
      {token === "" ? (
        <a
          href={`${auth}?client_id=${id}&redirect_uri=${uri}&response_type=${res}`}
        >
          login
        </a>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          <ArtistSearch token={token} />
        </div>
      )}
    </div>
  );
}

export default UserLog;
