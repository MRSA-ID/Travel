import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found | Article App Travel</title>
      </Helmet>
      <main className="mb-150 pt-[200px] text-white">
        <div className="mx-auto max-w-[700px] text-center">
          <h1 className="from-0 to-rose-500/0 bg-gradient-to-b from-rose-500 to-90% bg-clip-text text-[140px] font-bold leading-[1] text-transparent dark:text-transparent">
            404
          </h1>
          <p className="section-tagline -mt-16">Error</p>
          <h2 className="mb-9 text-[64px] font-bold leading-[1.22] ">
            Ooops! <br />
            Page Not Found
          </h2>
          <p className="mb-8 text-xl">
            This page doesn’t exist or was removed! <br />
            We suggest you go back to home.
          </p>
          <Link to={"/"} className="hover:text-rose-200">
            Go Back-Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
