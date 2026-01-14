const host = import.meta.env.VITE_API_URL;

console.log("API HOST:", host); // 👈 ADD THIS
if (!host) {
  console.error("❌ VITE_API_URL is undefined");
}

const urls = {
  loginAuth: {
    url: `${host}/login`,
    method: "POST",
  },
  register: {
    url: `${host}/register`,
    method: "POST",
  },
  taskForm: {
    url: `${host}/taskForm`,
    method: "POST",
  },
  getMyTasks: {
    url: `${host}/getMyTasks`,
    method: "GET",
  },
  updateTaskStatus: {
    url: `${host}/updateTaskStatus`,
    method: "PATCH",
  },
};

export default urls;
