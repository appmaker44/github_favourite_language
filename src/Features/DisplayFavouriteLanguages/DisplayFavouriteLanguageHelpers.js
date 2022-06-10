export const getLanguages = async (user) => {
  const repos = await listRepos(user);
  if (repos.message === "Not Found") {
    return { user, error: "Not Found" };
  }

  if (repos.length < 1) {
    return {
      user,
      issue: "Doesn't have any public repositories yet",
    };
  }

  if (typeof repos === "string") {
    return { user, error: "Request Failed" };
  }

  let languages = {};

  repos
    .map((repo) => repo.language)
    .filter((languageList) => languageList !== null)
    .forEach((language) => {
      languages[language]
        ? (languages[language] = languages[language] + 1)
        : (languages[language] = 1);
    });

  languages = Object.fromEntries(
    Object.entries(languages).sort(([, a], [, b]) => b - a)
  );

  if (Object.keys(languages).length < 1)
    return { user, issue: "Hasn't used any programming languages yet" };

  return { user, ...{ languages } };
};

export const listRepos = async (user) => {
  try {
    const result = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100`
    );
    const jsonBody = await result.json();
    return jsonBody;
  } catch (e) {
    return e.message;
  }
};
