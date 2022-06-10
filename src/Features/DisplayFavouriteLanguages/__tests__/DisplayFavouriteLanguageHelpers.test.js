import { listRepos, getLanguages } from "../DisplayFavouriteLanguageHelpers";
describe("listRepos", () => {
  it("should return an array containing language", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ language: "Java" }]),
      })
    );
    const reposArray = await listRepos("Gregg");
    expect(reposArray).toEqual(expect.arrayContaining([{ language: "Java" }]));

    global.fetch.mockClear();
  });

  it("should return error if fetch fails", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject({
        message: "failed fetch",
      })
    );
    const result = await listRepos("Gregg");
    expect(result).toEqual("failed fetch");

    global.fetch.mockClear();
  });
});

describe("getLanguages", () => {
  const unmockedFetch = global.fetch;
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { language: "Java" },
            { language: "Java" },
            { language: null },
            { language: "Python" },
            { language: "JavaScript" },
            { language: "Python" },
            { language: "Python" },
          ]),
      });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  it("should return object containing language and its no. of occurences", async () => {
    const languages = await getLanguages("Gregg");
    expect(languages.languages).toEqual(expect.objectContaining({ Java: 2 }));
  });

  it("should not collect any null languages", async () => {
    const languages = await getLanguages("Gregg");
    expect(languages.languages).not.toEqual(
      expect.objectContaining({ Java: 2, null: 1 })
    );
  });

  it("should return object containing languages no. of occurences in descedning order", async () => {
    const languages = await getLanguages("Gregg");
    expect(JSON.stringify(languages.languages)).toEqual(
      `{\"Python\":3,\"Java\":2,\"JavaScript\":1}`
    );
  });

  it("should return issue message if user hasn't used any languages", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ language: null }]),
      })
    );
    const languages = await getLanguages("Gregg");

    expect(languages.issue).toBeTruthy();
  });

  it("should return issue message if user has no repos", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
    const languages = await getLanguages("Gregg");

    expect(languages.issue).toBeTruthy();
  });
});
