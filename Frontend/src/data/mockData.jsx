import { tokens } from "../theme";


export const role = [
  {
    id: 1,
    firstName: "abdi",
    lastName: "Bacha",
    email: "abdi@gmail.com",
    password: "$2a$12$gcw1HdA5bzjGTBJBUpW1NeGl4xmyqUui142iuGepEK5.CJqUapn3W",
    role: "admin",
    createdAt: { $date: { $numberLong: "1713249334730" } },
    updatedAt: { $date: { $numberLong: "1713258170724" } },
  },
  {
    id: 2,
    firstName: "test",
    lastName: "ab",
    email: "test@gmail.com",
    role: "user",
    createdAt: { $date: { $numberLong: "1713336158777" } },
    updatedAt: { $date: { $numberLong: "1713336158777" } },
  },
  {
    id: 3,
    firstName: "aa",
    lastName: "ab",
    email: "testhello@gmail.com",
    role: "superAdmin",
    active: true,
    createdAt: { $date: { $numberLong: "1713355011581" } },
    updatedAt: { $date: { $numberLong: "1713355011581" } },
  },
  {
    id: 4,
    firstName: "abdi",
    lastName: "Bacha",
    email: "abdi@gmail.com",
    password: "$2a$12$gcw1HdA5bzjGTBJBUpW1NeGl4xmyqUui142iuGepEK5.CJqUapn3W",
    role: "admin",
    createdAt: { $date: { $numberLong: "1713249334730" } },
    updatedAt: { $date: { $numberLong: "1713258170724" } },
  },
  {
    id: 5,
    firstName: "test",
    lastName: "ab",
    email: "test@gmail.com",
    role: "user",
    createdAt: { $date: { $numberLong: "1713336158777" } },
    updatedAt: { $date: { $numberLong: "1713336158777" } },
  },
  {
    id: 6,
    firstName: "aa",
    lastName: "ab",
    email: "testhello@gmail.com",
    role: "superAdmin",
    active: true,
    createdAt: { $date: { $numberLong: "1713355011581" } },
    updatedAt: { $date: { $numberLong: "1713355011581" } },
  },
];


export const mockBarData = [
  {
    country: "AD",
    "active": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    Inactive: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    pending: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    completed: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "active": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    Inactive: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    pending: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    completed: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "active": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    Inactive: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    pending: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    completed: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "active": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    Inactive: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    pending: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    completed: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "active": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    Inactive: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    pending: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    completed: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  // {
  //   country: "AL",
  //   "hot dog": 66,
  //   "hot dogColor": "hsl(208, 70%, 50%)",
  //   burger: 111,
  //   burgerColor: "hsl(334, 70%, 50%)",
  //   kebab: 167,
  //   kebabColor: "hsl(182, 70%, 50%)",
  //   donut: 18,
  //   donutColor: "hsl(76, 70%, 50%)",
  // },
  // {
  //   country: "AM",
  //   "hot dog": 80,
  //   "hot dogColor": "hsl(87, 70%, 50%)",
  //   burger: 47,
  //   burgerColor: "hsl(141, 70%, 50%)",
  //   kebab: 158,
  //   kebabColor: "hsl(224, 70%, 50%)",
  //   donut: 49,
  //   donutColor: "hsl(274, 70%, 50%)",
  // },
];

export const mockPieData = [
  {
    id: "PM",
    label: "PM",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "IT",
    label: "IT",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "HR",
    label: "HR",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Marketing",
    label: "Marketing",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "Digital Transformation",
    label: "Digital Transformation",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Deposit",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "8AM",
        y: 101,
      },
      {
        x: "9AM",
        y: 75,
      },
      {
        x: "10AM",
        y: 36,
      },
      {
        x: "11AM",
        y: 216,
      },
      {
        x: "12AM",
        y: 35,
      },
      {
        x: "1PM",
        y: 236,
      },
      {
        x: "2PM",
        y: 88,
      },
      {
        x: "3PM",
        y: 232,
      },
      {
        x: "4PM",
        y: 281,
      },
      {
        x: "5PM",
        y: 1,
      },
      {
        x: "6PM",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "ATM withdrawal",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "8AM",
        y: 212,
      },
      {
        x: "9AM",
        y: 190,
      },
      {
        x: "10AM",
        y: 270,
      },
      {
        x: "11AM",
        y: 9,
      },
      {
        x: "12AM",
        y: 75,
      },
      {
        x: "1PM",
        y: 175,
      },
      {
        x: "2PM",
        y: 33,
      },
      {
        x: "3PM",
        y: 189,
      },
      {
        x: "4PM",
        y: 97,
      },
      {
        x: "5PM",
        y: 87,
      },
      {
        x: "6PM",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "Mobile Banking",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "8AM",
        y: 191,
      },
      {
        x: "9AM",
        y: 136,
      },
      {
        x: "10AM",
        y: 91,
      },
      {
        x: "11AM",
        y: 190,
      },
      {
        x: "12AM",
        y: 211,
      },
      {
        x: "1PM",
        y: 152,
      },
      {
        x: "2PM",
        y: 189,
      },
      {
        x: "3PM",
        y: 152,
      },
      {
        x: "4PM",
        y: 8,
      },
      {
        x: "5PM",
        y: 197,
      },
      {
        x: "6PM",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];