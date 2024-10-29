import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [dateNow, setDateNow] = useState<string | null>(null);

  function updateDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDateNow(date.toLocaleString("id-ID", options));
  }

  useEffect(() => {
    return () => {
      updateDate();
    };
  }, [dateNow]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold leading-7">Dashbor</h1>
        <p className="mt-2 font-semibold text-neutral-500">
          Terakhir Diperbarui
          <span className="font-semibold text-neutral-900 pl-1">{dateNow}</span>
        </p>
      </div>

      <div></div>
    </>
  );
};

export default DashboardPage;
