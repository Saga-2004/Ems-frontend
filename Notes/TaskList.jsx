import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementActiveTask,
  decrementActiveTask,
  incrementCompletedTask,
  incrementFailedTask,
} from "../../../Redux/Slice/EmployeeSlice";

export default function TaskList() {
  const dispatch = useDispatch();

  // 🟢 Track the current task status (simpler and scalable)
  const [taskStatus, setTaskStatus] = useState("new"); // "new" | "active" | "completed" | "failed"

  const handleAccept = () => {
    dispatch(incrementActiveTask());
    setTaskStatus("active");
  };

  const handleComplete = () => {
    dispatch(incrementCompletedTask());
    dispatch(decrementActiveTask());
    setTaskStatus("completed");
  };

  const handleReject = () => {
    dispatch(incrementFailedTask());
    if (taskStatus === "active") dispatch(decrementActiveTask());
    setTaskStatus("failed");
  };

  // 🎨 Dynamic styles based on status
  const statusColors = {
    new: "bg-green-600",
    active: "bg-yellow-500",
    completed: "bg-blue-600",
    failed: "bg-red-600",
  };

  const statusLabels = {
    new: "New Task",
    active: "In Progress",
    completed: "Completed",
    failed: "Failed Task",
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10 mt-2 bg-cyan-100 py-10">
      <div
        className={`flex flex-col text-white p-3 rounded-2xl ${statusColors[taskStatus]} transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="px-3 py-2 rounded-2xl bg-black/20 font-semibold">
            {statusLabels[taskStatus]}
          </h1>
          <h1>23-10-2024</h1>
        </div>

        {/* Task content */}
        <div className="border border-gray-100 rounded-2xl mt-2 p-3 bg-white/10">
          <h1 className="font-bold text-2xl mb-2.5">Task Title</h1>
          <p className="font-medium mb-3">Task Description</p>

          {/* Conditional Buttons */}
          {taskStatus === "new" && (
            <>
              <button
                onClick={handleAccept}
                className="bg-black hover:bg-gray-800 text-white font-semibold p-2 rounded m-1 transition-all duration-300"
              >
                Accept Task
              </button>
              <button
                onClick={handleReject}
                className="bg-black hover:bg-gray-800 text-white font-semibold p-2 rounded m-1 transition-all duration-300"
              >
                Reject Task
              </button>
            </>
          )}

          {taskStatus === "active" && (
            <>
              <button
                onClick={handleComplete}
                className="bg-black hover:bg-gray-800 text-white font-semibold p-2 rounded m-1 transition-all duration-300"
              >
                Mark as Complete
              </button>
              <button
                onClick={handleReject}
                className="bg-black hover:bg-gray-800 text-white font-semibold p-2 rounded m-1 transition-all duration-300"
              >
                Mark as Failed
              </button>
            </>
          )}

          {taskStatus === "completed" && (
            <button
              disabled
              className="bg-gray-400 text-white font-semibold p-2 rounded m-1 cursor-not-allowed"
            >
              ✅ Completed
            </button>
          )}

          {taskStatus === "failed" && (
            <button
              disabled
              className="bg-gray-500 text-white font-semibold p-2 rounded m-1 cursor-not-allowed"
            >
              ❌ Task Failed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
