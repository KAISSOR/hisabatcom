import Cookies from "universal-cookie";

const Main = () => {
  const cookies = new Cookies();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Corrected typo: removeItem instead of removeitem
    window.location = "/register";
    cookies.remove('auth-company');

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
