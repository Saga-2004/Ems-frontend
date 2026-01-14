const employees = [
  {
    id: 1,
    name: "John",
    email: "user1@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Prepare Project Report",
        taskDescription: "Compile and format the Q4 financial report.",
        taskDate: "2025-11-06",
        category: "Work",
      },
    ],
  },
  {
    id: 2,
    name: "Emma",
    email: "user2@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Team Meeting",
        taskDescription: "Discuss project milestones and deliverables.",
        taskDate: "2025-11-07",
        category: "Meetings",
      },
    ],
  },
  {
    id: 3,
    name: "Liam",
    email: "user3@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client Follow-up",
        taskDescription: "Send update email to client regarding feedback.",
        taskDate: "2025-11-03",
        category: "Communication",
      },
    ],
  },
  {
    id: 4,
    name: "Olivia",
    email: "user4@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 1,
    },
    tasks: [
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Design Mockups",
        taskDescription: "Create new UI mockups for the homepage redesign.",
        taskDate: "2025-10-30",
        category: "Design",
      },
    ],
  },
  {
    id: 5,
    name: "Noah",
    email: "user5@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Code Review",
        taskDescription: "Review and comment on pull requests in repository.",
        taskDate: "2025-11-06",
        category: "Development",
      },
    ],
  },
  {
    id: 6,
    name: "Ava",
    email: "user6@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Update Documentation",
        taskDescription: "Revise API documentation for new endpoints.",
        taskDate: "2025-11-08",
        category: "Documentation",
      },
    ],
  },
  {
    id: 7,
    name: "Ethan",
    email: "user7@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Market Research",
        taskDescription: "Collect competitor data for quarterly analysis.",
        taskDate: "2025-11-09",
        category: "Research",
      },
    ],
  },
  {
    id: 8,
    name: "Sophia",
    email: "user8@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Deploy New Version",
        taskDescription: "Push version 2.3.1 to production servers.",
        taskDate: "2025-11-05",
        category: "Deployment",
      },
    ],
  },
  {
    id: 9,
    name: "James",
    email: "user9@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix Login Bug",
        taskDescription: "Resolve issue preventing OAuth login on mobile.",
        taskDate: "2025-11-06",
        category: "Bug Fix",
      },
    ],
  },
  {
    id: 10,
    name: "Mia",
    email: "user10@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Plan Sprint",
        taskDescription: "Define goals and tasks for Sprint 14.",
        taskDate: "2025-11-10",
        category: "Planning",
      },
    ],
  },
];

const admin = [
  {
    name: "superadmin",
    password: "SuperSecure#1",
    id: 1,
  },
  {
    name: "ops_admin",
    password: "OpsAdmin2025",
    id: 2,
  },
  {
    name: "security_admin",
    password: "Sec!urity9",
    id: 3,
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return { employees, admin };
};
