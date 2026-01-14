import { useEffect, useRef, useState } from "react";
import urls from "../../../Common/routes";
import Header from "../others/Header";

export default function AdminDashboard() {
  const formRef = useRef();
  const [allTasks, setAllTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleAllTasks() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(urls.getMyTasks.url, {
        method: urls.getMyTasks.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log("Error in fetching");
        return;
      }

      const taskData = await res.json();
      console.log("AdminDashBoard Backend tasks response:", taskData);
      setAllTasks(taskData);
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  }

  async function handleTaskForm(e) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    try {
      const token = localStorage.getItem("token");

      const form = formRef.current;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log("Sending data: ", data);

      const response = await fetch(urls.taskForm.url, {
        method: urls.taskForm.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      console.log("Coming data: ", resData);
      
      if (response.ok) {
        setSuccessMessage("Task created successfully!");
        form.reset();
        // Refresh tasks list
        await handleAllTasks();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.log("AdminDashboard.jsx:  ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleAllTasks();
  }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      new: "bg-green-100 text-green-800 border-green-300",
      active: "bg-amber-100 text-amber-800 border-amber-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      failed: "bg-red-100 text-red-800 border-red-300",
    };

    const statusLabels = {
      new: "New",
      active: "In Progress",
      completed: "Completed",
      failed: "Failed",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.new}`}
      >
        {statusLabels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Title */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Create and manage tasks for your team</p>
        </div>

        {/* Create Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Task
          </h2>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleTaskForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Task Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  placeholder="Enter task title"
                />
              </div>

              {/* Task Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              </div>

              {/* Assign To */}
              <div>
                <label
                  htmlFor="assignTo"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Assign To <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="assignTo"
                  id="assignTo"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  placeholder="Employee email or name"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  placeholder="e.g., Development, Design, Testing"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Task Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none"
                  placeholder="Describe the task in detail..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>

        {/* All Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Tasks
            </h2>
            <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
              {allTasks?.data?.length || 0} Tasks
            </span>
          </div>

          {allTasks?.data?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No tasks available</p>
              <p className="text-gray-400 text-sm mt-2">
                Create your first task to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {allTasks?.data?.map((task) => (
                <div
                  key={task._id}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Task Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(task.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>

                  {/* Task Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {task.description}
                  </p>

                  {/* Task Meta Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-cyan-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">{task.owner?.name || "N/A"}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-cyan-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="truncate">{task.owner?.email || "N/A"}</span>
                    </div>
                    {task.category && (
                      <div className="flex items-center text-xs text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-cyan-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        <span className="font-medium text-cyan-600">
                          {task.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
