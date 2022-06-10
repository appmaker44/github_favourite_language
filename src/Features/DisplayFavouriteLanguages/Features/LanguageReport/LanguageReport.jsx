import style from "./css/LanguageReport.module.css";

const LanguageReport = ({
  languageResult,
  welcomeText,
  errorStatus,
  issueStatus,
  user,
}) => {
  return (
    <>
      {languageResult !== welcomeText && !errorStatus && !issueStatus && (
        <p className={style.responseText}>
          {user || "..."}'s favourite programming language to use is:
        </p>
      )}

      <p data-testid="languageValue" className={style.language}>
        {languageResult}
      </p>
    </>
  );
};

export default LanguageReport;
