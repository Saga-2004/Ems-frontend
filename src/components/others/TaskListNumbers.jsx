import React from "react";
import { useSelector } from "react-redux";

export default function TaskListNumbers() {
  const { activeTask, completedTask, failedTask, newTask } = useSelector(
    (state) => state.employee
  );

  const stats = [
    {
      label: "New Tasks",
      value: newTask,
      bgColor: "from-green-500 to-green-600",
      iconColor: "text-green-100",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      label: "Active Tasks",
      value: activeTask,
      bgColor: "from-amber-500 to-amber-600",
      iconColor: "text-amber-100",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completedTask,
      bgColor: "from-blue-500 to-blue-600",
      iconColor: "text-blue-100",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Failed",
      value: failedTask,
      bgColor: "from-red-500 to-red-600",
      iconColor: "text-red-100",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.iconColor} opacity-90`}>{stat.icon}</div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-5xl font-bold">{stat.value}</p>
                <p className="text-sm sm:text-base font-medium opacity-90">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
