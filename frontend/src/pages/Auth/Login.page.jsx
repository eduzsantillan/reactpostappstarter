import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <div className=" flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 lg:w-5/12">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Welcome
        </h1>
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded-lg"
              placeholder="example@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded-lg"
              placeholder="********"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
          {authLoading ? (
            <h2 text-2xl font-semibold text-gray-800 mb-6 text-center>
              Loading...
            </h2>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
