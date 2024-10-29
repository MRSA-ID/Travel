import StatsCard from "@/components/dashboard/StatsCard";
import ArticleIcon from "@/components/icons/ArticleIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import { useEffect, useState } from "react";
import {
  Legend,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Pie,
  Cell,
} from "recharts";

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
  const categoryData = [
    { name: "Technology", articles: 40 },
    { name: "Lifestyle", articles: 30 },
    { name: "Business", articles: 20 },
    { name: "Travel", articles: 10 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
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

      <div className="p-6 bg-gray-50 min-h-screen mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Articles"
            value="2,419"
            icon={<ArticleIcon className="w-6 h-6" />}
          />
          <StatsCard
            title="Comments"
            value="2,419"
            icon={<CommentIcon className="w-6 h-6" />}
          />
          <StatsCard
            title="Categories"
            value="2,419"
            icon={<CategoryIcon className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Articles by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={categoryData}
                    dataKey="articles"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
