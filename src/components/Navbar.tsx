import { useAppSelector } from "@/hooks/redux-hooks";
import { getAvatarUrl } from "@/utils/helper";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Memoize avatar style
  const avatarStyle = {
    backgroundImage: `url(${getAvatarUrl(user?.username as string)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <nav className="flex justify-between text-black bg-white px-10 pb-3 pt-5 w-full">
      <h1 className="font-Kanit font-bold italic text-3xl">SANTRA</h1>
      <div className="flex items-center justify-center flex-col">
        {user ? (
          <div className="flex gap-5">
            <div className="w-full">
              <Popover>
                <PopoverButton
                  className="inline-block h-10 w-10 flex-none rounded-full object-cover"
                  style={avatarStyle}
                ></PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom end"
                  className="z-50 p-0 divide-white/5 rounded-xl bg-white ring-2 ring-black/45 text-black text-sm/6 transition duration-200 translate-y-3 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                >
                  <div className="p-3">
                    <div className="w-full">
                      {location.pathname === "/" && (
                        <Link
                          to={"/dashboard"}
                          className="font-Syne font-medium border bg-white italic border-gray-400 block px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-xl"
                        >
                          Dashboard
                        </Link>
                      )}
                      {location.pathname === "/dashboard" && (
                        <Link
                          to={"/"}
                          className="font-Syne font-medium border bg-white italic border-gray-400 block px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-xl"
                        >
                          <span>Go Home</span>
                        </Link>
                      )}
                    </div>
                    <Link
                      className="block mt-2 font-Syne text-center bg-red-100 rounded-lg py-2.5 px-5 transition hover:bg-red-200"
                      to={"/auth/logout"}
                    >
                      <p className="text-red-400 font-medium uppercase">
                        Log Out
                      </p>
                    </Link>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="font-Syne font-medium border bg-white italic border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-xl"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
