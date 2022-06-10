import "./css/setUsername.module.css";
const SetUsername = ({ username, handleChange, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="Github Username (max 39)"
        value={username}
      />

      <button disabled={!username} type="submit">
        Search
      </button>
    </form>
  );
};

export default SetUsername;
