import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:linkto">
          <LinkTo />
        </Route>
        <Route path="/">
          <Lander />
        </Route>
      </Switch>
    </Router>
  );
}

function Lander() {
  const [url, setURL] = useState("");

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const id = makeid(6);

  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const error = query.get("error");
  const link = query.get("link");
  const oblink = `https://{domain}/${link}`;

  var srca = false;

  if (link !== null) {
    srca = true;
  }

  return (
    <>
      <span id="title" draggable="false">
        Shortlinks
      </span>
      <img
        id="logo"
        alt="logo"
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      />
      <div className="wrapper">
        <p>Make sure to add "https://"</p>
        <form action="https://{server domain}/new.link" method="post">
          <input type="hidden" name="id" value={id} />
          <input
            type="url"
            value={url}
            name="url"
            onChange={(e) => setURL(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="Submit" id="submit-button" />
          <br />
          <br />
        </form>
        {error}
        {srca ? (
          <>
            <a href={oblink}>Here's your link!</a>
            <br />
            <p>{oblink}</p>
          </>
        ) : null}
      </div>
    </>
  );
}

function LinkTo() {
  let { linkto } = useParams();
  console.log(linkto);

  async function redirectTo() {
    window.location.replace(`https://{server domain}/ob/${linkto}`);
  }
  useEffect(() => {
    redirectTo();
  });

  return <div></div>;
}
