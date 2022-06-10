import style from "./css/UserHeader.module.css";

const UserHeader = ({ user, languageResult, welcomeText, errorStatus }) => {
  return (
    <h1 className={style.largeFont} data-testid="usernameHeader">
      {user}
      <a
        href={`https://www.github.com/${
          languageResult !== welcomeText && !errorStatus ? user : ""
        }`}
      >
        <img
          className={style.logo}
          src={require("../../../.././images/github_light.png")}
          alt="Github"
        />
      </a>
    </h1>
  );
};

export default UserHeader;
