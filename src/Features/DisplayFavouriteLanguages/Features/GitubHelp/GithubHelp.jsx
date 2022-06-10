import style from "./css/GithubHelp.module.css";

const GithubHelp = ({ errorStatus }) => {
  if (errorStatus) {
    return (
      <>
        <ul className={style.githubUsernameRules}>
          <li>
            Github username may only contain alphanumeric characters or hyphens.
          </li>
          <li>Github username cannot have multiple consecutive hyphens.</li>
          <li>Github username cannot begin or end with a hyphen.</li>
          <li>Maximum is 39 characters.</li>
        </ul>
      </>
    );
  }
};

export default GithubHelp;
