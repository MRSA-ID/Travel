import { useState } from "react";
import DashboardIcon from "./icons/DashboardIcon";
import { Link, useLocation } from "react-router-dom";
import { getAvatarUrl } from "@/utils/helper";
import { useAppSelector } from "@/hooks/redux-hooks";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import ArticleIcon from "./icons/ArticleIcon";
import CommentIcon from "./icons/CommentIcon";
import CategoryIcon from "./icons/CategoryIcon";
import UserIcon from "./icons/UserIcon";
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Memoize avatar style
  const avatarStyle = {
    backgroundImage: `url(${getAvatarUrl(user?.username as string)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <DashboardIcon
          className={`w-5 h-5  group-hover:fill-neutral-900 ${location.pathname === "/dashboard" ? "fill-neutral-900" : "fill-neutral-400"}`}
        />
      ),
      path: "/dashboard",
    },
    {
      title: "Articles",
      icon: (
        <ArticleIcon
          className={`w-5 h-5  group-hover:fill-neutral-900 ${location.pathname === "/dashboard/article" ? "fill-neutral-900" : "fill-neutral-400"}`}
        />
      ),
      path: "/dashboard/article",
    },
    {
      title: "Comments",
      icon: (
        <CommentIcon
          className={`w-5 h-5  group-hover:fill-neutral-900 ${location.pathname === "/dashboard/comments" ? "fill-neutral-900" : "fill-neutral-400"}`}
        />
      ),
      path: "/dashboard/comments",
    },
    {
      title: "Categories",
      icon: (
        <CategoryIcon
          className={`w-5 h-5  group-hover:fill-neutral-900 ${location.pathname === "/dashboard/category" ? "fill-neutral-900" : "fill-neutral-400"}`}
        />
      ),
      path: "/dashboard/category",
    },
  ];

  const menuSettingItems = [
    {
      title: "Profile",
      icon: (
        <UserIcon
          className={`w-5 h-5  group-hover:fill-neutral-900 ${location.pathname === "/dashboard/profile" ? "fill-neutral-900" : "fill-neutral-400"}`}
        />
      ),
      path: "/dashboard/profile",
    },
  ];

  return (
    <aside
      className={`h-screen relative bg-white border-r transition-all overflow-hidden duration-700 ease-in-out
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Sidebar */}
      <div className="flex items-center justify-between h-16 px-4 border-b bg-gray-50">
        {!isCollapsed && (
          <h1 className="text-xl font-Kanit font-bold text-gray-800 italic uppercase">
            santra
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ArrowRightStartOnRectangleIcon className="size-6 fill-black" />
          ) : (
            <ArrowLeftEndOnRectangleIcon className="size-6 fill-black" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8 divide-y-2 px-4 divide-gray-300">
        <div className="space-y-2 pb-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`group flex items-center px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 truncate ${location.pathname === item.path ? "bg-gray-200 text-gray-900" : "text-neutral-400"}`}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="ml-4 font-medium font-Syne">{item.title}</span>
              )}
            </Link>
          ))}
        </div>
        <div className="space-y-2 pt-2">
          {menuSettingItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`group flex items-center px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 truncate ${location.pathname === item.path ? "bg-gray-200 text-gray-900" : "text-neutral-400"}`}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="ml-4 font-medium font-Syne">{item.title}</span>
              )}
            </Link>
          ))}
          <Link
            to={"/"}
            className="flex group items-center font-Syne font-medium border bg-white text-black italic px-4 py-3 border-gray-400  hover:bg-black hover:text-white transition-colors duration-300 rounded-lg truncate"
          >
            <HomeIcon
              className={`w-5 h-5 fill-neutral-400 group-hover:fill-white`}
            />
            {!isCollapsed && (
              <span className="ml-4 font-medium text-neutral-400 font-Syne group-hover:text-white">
                Go Home
              </span>
            )}
          </Link>
          <Link
            className="flex group items-center mt-2 font-Syne px-4 py-3 bg-red-100 rounded-lg transition hover:bg-red-200 truncate"
            to={"/logout"}
          >
            <LogoutIcon
              className={`w-5 h-5 fill-red-400 group-hover:fill-red-600`}
            />
            {!isCollapsed && (
              <span className="ml-4 font-medium font-Syne text-red-400 group-hover:text-red-600 ">
                Log Out
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Footer Area */}
      <div className="absolute bottom-0 w-full p-4 bg-gray-50 border-t">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-4"}`}
        >
          <div className="w-8 h-8 rounded-full" style={avatarStyle} />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900 truncate ">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate ">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
