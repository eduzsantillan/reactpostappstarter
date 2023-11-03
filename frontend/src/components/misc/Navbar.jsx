import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

// https://tailwindui.com/components/application-ui/navigation/navbars
const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };
  const currentPath = useLocation().pathname.slice(1);

  const navigation = user
    ? [
        { name: "Post", toRoute: "posts", current: currentPath == "posts" },
        {
          name: "Create",
          toRoute: "posts/create",
          current: currentPath == "posts/create",
        },
        { name: "Logout", toRoute: "#", current: false, actionFn: onLogout },
      ]
    : [
        { name: "Home", toRoute: "/", current: currentPath == "" },
        { name: "Login", toRoute: "login", current: currentPath == "login" },
      ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-indigo-50 mb-8">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center 
                rounded-md p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mb-3"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center ">
                  <NavLink to="/">
                    <h3 className="drop-shadow text-2xl font-semibold text-gray-700  tracking-wide">
                      LOGO
                    </h3>
                  </NavLink>
                </div>
                {/* Menu links */}
                <div className="sm:ml-auto">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.toRoute}
                          className={classNames(
                            item.current
                              ? "bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow-md drop-shadow "
                              : "bg-indigo-600 text-white drop-shadow ",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          <h4 onClick={item.actionFn}>{item.name}</h4>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.toRoute}
                  className={classNames(
                    item.current
                      ? " text-indigo-600 font-semibold py-2 px-4 drop-shadow "
                      : "text-gray-700 drop-shadow ",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <h4 onClick={item.actionFn}>{item.name}</h4>
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
