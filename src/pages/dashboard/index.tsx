import StatsCard from "@/components/dashboard/StatsCard";
import ArticleIcon from "@/components/icons/ArticleIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import useArticleForm from "@/hooks/article/useForm";
import useCategoryForm from "@/hooks/category/useForm";
import useCommentForm from "@/hooks/comments/useForm";
import { ArticlesList } from "@/types/articles";
import { useEffect, useMemo, useState } from "react";
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
  const article = useArticleForm();
  const comment = useCommentForm();
  const category = useCategoryForm();
  function updateDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDateNow(date.toLocaleString("id-ID", options));
  }

  const chartData = useMemo(() => {
    const categoryCount = (article.items as ArticlesList[]).reduce(
      (acc, article) => {
        const category = article.category?.name || "Uncategorized";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [article.items]);

  const chartDataComments = useMemo(() => {
    const articleTitle = (article.items as ArticlesList[]).reduce(
      (acc, article) => {
        const title = article.title || "Not have title";
        const comment = article.comments.length;
        acc[title] = comment || 0;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(articleTitle).map(([name, value]) => ({
      name,
      value,
    }));
  }, [article.items]);

  console.log("chartDataComments: ", chartDataComments);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const COLORSCOMMENT = [
    "#23272b",
    "#8884d8",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#00C49F",
  ];
  useEffect(() => {
    return () => {
      updateDate();
    };
  }, [dateNow]);

  useEffect(() => {
    return () => {
      article.loadArticles();
      comment.loadComments();
      category.loadCategory();
    };
  }, []);

  const totalArticles = String(article.total);
  const totalComments = String(comment.total);
  const totalCategory = String(category.total);

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
            value={totalArticles}
            icon={<ArticleIcon className="w-6 h-6" />}
          />
          <StatsCard
            title="Total Comments"
            value={totalComments}
            icon={<CommentIcon className="w-6 h-6" />}
          />
          <StatsCard
            title="Total Categories"
            value={totalCategory}
            icon={<CategoryIcon className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Articles by Category</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Articles by Comments</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartDataComments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartDataComments.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORSCOMMENT[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
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
