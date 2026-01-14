import Header from "../others/Header";
import TaskListNumbers from "../others/TaskListNumbers";
import TaskList from "../Tasklist/TaskList";

export default function EmployeDashboard({ refreshTasks }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <TaskListNumbers />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">Manage and track your assigned tasks</p>
        </div>
        <TaskList refreshTasks={refreshTasks} />
      </div>
    </div>
  );
}
