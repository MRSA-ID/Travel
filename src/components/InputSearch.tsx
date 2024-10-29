import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { debounce } from "lodash";

interface PropsInputSearch {
  onSearch: (value: string) => void;
}

const InputSearch = ({ onSearch }: PropsInputSearch) => {
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="size-6 fill-black" />
      </div>
      <Input
        id="search"
        name="search"
        type="text"
        placeholder="Cari Nama Article"
        required
        className={`block w-full rounded-md border-none bg-black/5 text-black focus:ring-2 ring-black/25 py-3 pl-11 text-sm/6 outline-none`}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;
