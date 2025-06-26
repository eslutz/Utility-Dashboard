import { useState, useEffect } from "react";
import { fetchUtilityMetrics } from "../services/api";

interface UtilityMetric {
  type: string;
  value: number;
  unit: string;
  date: string;
}

export const UtilityMetrics = () => {
  const [metrics, setMetrics] = useState<UtilityMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        setLoading(true);
        const data = await fetchUtilityMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError("Failed to load utility metrics. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="font-medium text-gray-500">{metric.type}</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold">{metric.value}</span>
            <span className="text-gray-500">{metric.unit}</span>
          </div>
          <div className="mt-2 text-sm text-gray-400">Last updated: {new Date(metric.date).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};
