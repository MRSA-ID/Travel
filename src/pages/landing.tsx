import { ChangeEvent, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  getArticles,
  resetArticles,
  getArticleDetail,
} from "@/store/slices/articleSlices";
import { Link } from "react-router-dom";
import { Button, Select, Input } from "@headlessui/react";
import {
  SkeletonButton,
  SkeletonCard,
  SkeletonSearch,
  SkeletonSelect,
} from "@/components/Skeletons";
import CardArticle from "@/components/CardArticle";
import ModalArticleDetail from "@/components/ModalArticleDetail";
import { getParams } from "@/utils/helper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { INITIAL_PAGINATION_STATE } from "@/hooks/article/useForm";

const Landing = () => {
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [paginationPage, setPaginationPage] = useState(
  // 	INITIAL_PAGINATION_STATE
  // );

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    items: articles,
    item: selectedArticle,
    isLoading: isLoadingDetail,
    errorDetailArticle,
  } = useAppSelector((state) => state.articles);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(() => e.target.value);
  };

  useEffect(() => {
    loadArticles();
    return () => {
      dispatch(resetArticles());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search, INITIAL_PAGINATION_STATE]);

  const loadArticles = async () => {
    const params = getParams(INITIAL_PAGINATION_STATE, "Article", search);
    await dispatch(getArticles(params));
  };

  const handleCardClick = async (articleId: string) => {
    const params = getParams(INITIAL_PAGINATION_STATE, "Article", search);
    setIsModalOpen(true);
    dispatch(getArticleDetail({ dokId: articleId, param: params }));
  };

  return (
    <main>
      {/* tampilan ketika belum login */}
      <Navbar />
      <Hero />
      {/* section ini untuk pembatas menampilkan keseluruhan content dengan login  */}
      {!user ? (
        <div className="barrier bg-gradient-to-t from-white via-white to-transparent w-full h-[200px] absolute bottom-0 z-30 flex justify-center items-center">
          <Link
            to={"/login"}
            className="font-Syne font-medium border bg-black italic border-gray-400 px-5 py-1 hover:bg-white hover:text-black transition-colors duration-300 rounded-xl"
          >
            Log in to Explore More Content
          </Link>
        </div>
      ) : (
        // seluruh content article
        <>
          <section className="bg-white px-4 py-5 flex items-center justify-center">
            <div className="md:max-w-[1200px] xl:max-w-[1540px] w-full">
              {/* component top filter for content */}
              {!articles ? (
                <div className="w-full">
                  {/* this show if api error */}
                  <div className="relative w-full mb-3">
                    <SkeletonSearch />
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <div className="flex gap-3 flex-wrap">
                      <SkeletonButton />
                      <SkeletonButton />
                      <SkeletonButton />
                    </div>
                    <div className="max-w-36 w-full mt-3 md:mt-0">
                      <SkeletonSelect />
                    </div>
                  </div>
                </div>
              ) : articles.length === 0 ? (
                <div className="w-full">
                  {/* component search */}
                  <div className="relative w-full mb-3">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="size-6 fill-black/35" />
                    </div>
                    <Input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Cari Nama Article"
                      className={`mt-3 block w-full rounded-full border-none bg-black/15 text-black focus:ring-2 ring-black/25 p-3 pl-11 text-sm/6 outline-none cursor-not-allowed`}
                      disabled
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* component search */}
                  <div className="relative w-full mb-3">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="size-6 fill-black" />
                    </div>
                    <Input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Cari Nama Article"
                      required
                      className={`mt-3 block w-full rounded-full border-none bg-black/5 text-black focus:ring-2 ring-black/25 p-3 pl-11 text-sm/6 outline-none`}
                      value={search}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <div className="flex gap-3 flex-wrap">
                      <Button className="font-Syne mb-2 font-medium border bg-white italic text-black border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-md">
                        All
                      </Button>
                      <Button className="font-Syne mb-2 font-medium border bg-white italic text-black border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-md">
                        By Category
                      </Button>
                      <Button className="font-Syne mb-2 font-medium border bg-white italic text-black border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-md">
                        By Populer Comments
                      </Button>
                    </div>
                    <div className="w-36">
                      <Select
                        className={`
										font-Syne mb-2 font-medium border bg-white italic text-black border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-md focus:outline-none
									`}
                      >
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                      </Select>
                      <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {!articles ? (
                  [1, 2, 3, 4].map((_, index) => <SkeletonCard key={index} />)
                ) : articles.length === 0 ? (
                  <div className="flex col-span-full h-40 items-center justify-center">
                    <p className="font-Syne text-center font-semibold text-neutral-400">
                      Tidak Ada Article
                    </p>
                  </div>
                ) : (
                  articles.map((card, index) => (
                    <CardArticle
                      key={index}
                      {...card}
                      onClick={handleCardClick}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
          <ModalArticleDetail
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            article={selectedArticle}
            isLoading={isLoadingDetail}
            error={errorDetailArticle}
          />
        </>
      )}
    </main>
  );
};

export default Landing;
