import { useState } from "react";
import SetUsername from "./SetUsername/SetUsername";
import DisplayFavouriteLanguage from "./DisplayFavouriteLanguages/DisplayFavouriteLanguage";

const FavouriteLanguage = () => {
  const [username, setUsername] = useState("");
  const [buttonPressed, setbuttonPressed] = useState(false);

  const clearUsername = () => {
    setbuttonPressed(false);
    setUsername("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    setbuttonPressed(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setbuttonPressed(true);
  };

  return (
    <>
      <h1>Github Users Favourite Programming Language</h1>

      <SetUsername
        handleSearch={handleSearch}
        username={username}
        handleChange={handleChange}
      />

      <DisplayFavouriteLanguage
        username={username}
        buttonPressed={buttonPressed}
        clearUsername={clearUsername}
      />
    </>
  );
};

export default FavouriteLanguage;
