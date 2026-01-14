import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  updateTaskStatus as updateTaskStatusAction,
} from "../../../Redux/Slice/EmployeeSlice";
import urls from "../../../Common/routes";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.employee);
  console.log("Redux tasks:", tasks);
  const taskArray = tasks || [];

  // Fetch tasks on component mount if tasks are empty and user is authenticated
  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Only fetch if tasks are empty
      if (tasks.length === 0) {
        try {
          const res = await fetch(urls.getMyTasks.url, {
            method: urls.getMyTasks.method,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) {
            console.log("Error in fetching tasks");
            return;
          }

          const taskData = await res.json();
          if (taskData.data) {
            dispatch(setTasks(taskData.data));
          }
        } catch (error) {
          console.log("Error fetching tasks:", error.message);
        }
      }
    }

    fetchTasks();
  }, [dispatch, tasks.length]); // Fetch when component mounts or when tasks become empty

  async function updateTaskStatus(id, status) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${urls.updateTaskStatus.url}/${id}`, {
        method: urls.updateTaskStatus.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        console.log("Failed to update task:", res.statusText);
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error updating task:", error.message);
      return false;
    }
  }

  async function handleAccept(id) {
    const success = await updateTaskStatus(id, "active");
    if (success) {
      // Update Redux store immediately for live UI update
      dispatch(updateTaskStatusAction({ taskId: id, status: "active" }));
    }
  }

  async function handleCompleted(id) {
    const success = await updateTaskStatus(id, "completed");
    if (success) {
      // Update Redux store immediately for live UI update
      dispatch(updateTaskStatusAction({ taskId: id, status: "completed" }));
    }
  }

  async function handleReject(id) {
    const success = await updateTaskStatus(id, "failed");
    if (success) {
      // Update Redux store immediately for live UI update
      dispatch(updateTaskStatusAction({ taskId: id, status: "failed" }));
    }
  }

  const bgColors = {
    new: "bg-green-600",
    active: "bg-amber-900 ",
    completed: "bg-blue-600",
    failed: "bg-red-600",
  };

  const taskLabels = {
    new: "New",
    active: "In Progress",
    completed: "Completed",
    failed: "Failed",
  };

  if (taskArray.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-20 w-20"
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
        <p className="text-gray-500 text-lg font-medium">No tasks available</p>
        <p className="text-gray-400 text-sm mt-2">
          You don't have any tasks assigned yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {taskArray.map((task) => {
        const id = task._id;
        const status = task.status || "new";
        return (
          <div
            key={id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
          >
            {/* Status Badge Header */}
            <div
              className={`${bgColors[status]} px-4 py-3 flex justify-between items-center`}
            >
              <span className="text-white font-bold text-sm px-3 py-1.5 rounded-full border border-white border-opacity-30 shadow-sm">
                {taskLabels[status]}
              </span>
              <span className="text-white text-xs font-medium opacity-95">
                {new Date(task.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Task Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {task.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                {status === "new" && (
                  <>
                    <button
                      onClick={() => handleAccept(id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      Accept Task
                    </button>
                    <button
                      onClick={() => handleReject(id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      Reject Task
                    </button>
                  </>
                )}
                {status === "active" && (
                  <>
                    <button
                      onClick={() => handleCompleted(id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleReject(id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      Mark as Failed
                    </button>
                  </>
                )}
                {status === "completed" && (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed shadow-sm"
                  >
                    ✓ Completed
                  </button>
                )}
                {status === "failed" && (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed shadow-sm"
                  >
                    ✗ Rejected
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
