import { useEffect, useState } from "react";
import { getLanguages } from "./DisplayFavouriteLanguageHelpers";
import "./css/DisplayFavouriteLanguage.module.css";
import UserHeader from "./Features/UserHeader/UserHeader";
import LanguageReport from "./Features/LanguageReport/LanguageReport";
import GithubHelp from "./Features/GitubHelp/GithubHelp";

const DisplayFavouriteLanguage = ({
  username,
  buttonPressed,
  clearUsername,
}) => {
  const welcomeText =
    "Search for a Github username, and we'll guess their favourite programming language!";
  const [languageResult, setLanguageResult] = useState(welcomeText);
  const [user, setUser] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [issueStatus, setIssueStatus] = useState(false);

  useEffect(() => {
    const asyncSetLanguage = async () => {
      setLanguageResult("Loading");

      const languagesData = await getLanguages(username);

      setUser(languagesData.user);

      if (languagesData.error === undefined) {
        if (languagesData.issue === undefined) {
          setLanguageResult(Object.keys(languagesData.languages)[0]);
          setIssueStatus(false);
        } else {
          setLanguageResult(languagesData.issue);
          setIssueStatus(true);
        }

        setErrorStatus(false);
      } else {
        setLanguageResult(languagesData.error);
        setErrorStatus(true);
        setIssueStatus(false);
      }
    };
    if (buttonPressed) {
      asyncSetLanguage();
      clearUsername();
    }
  }, [buttonPressed, clearUsername, username]);

  return (
    <>
      <UserHeader
        user={user}
        languageResult={languageResult}
        welcomeText={welcomeText}
        errorStatus={errorStatus}
      />

      <LanguageReport
        languageResult={languageResult}
        welcomeText={welcomeText}
        errorStatus={errorStatus}
        issueStatus={issueStatus}
        user={user}
      />

      <GithubHelp errorStatus={errorStatus} />
    </>
  );
};

export default DisplayFavouriteLanguage;
