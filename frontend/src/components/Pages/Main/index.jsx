import Cookies from "universal-cookie";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Corrected typo: removeItem instead of removeitem
    window.location = "/register";

  };

  return (
    <div >
      <nav>
        <h1>fakebook</h1>
        <button  onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
