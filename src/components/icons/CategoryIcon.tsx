import { Icon } from "@/types/icon";
import { FC } from "react";

const CategoryIcon: FC<Icon> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12.876 2h-8.876v9.015l10.972 11.124 9.028-9.028-11.124-11.111zm-3.139 5.737c-.684.684-1.791.684-2.475 0s-.684-1.791 0-2.474c.684-.684 1.791-.684 2.475 0 .684.683.684 1.791 0 2.474zm1.866 13.827l-1.369 1.436-10.234-10.257v-7.743h2v6.891l9.603 9.673z" />
    </svg>
  );
};

export default CategoryIcon;
