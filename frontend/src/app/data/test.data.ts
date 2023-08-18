import {Category} from "../models/category";
import {Priority} from "../models/priority";
import {Task} from "../models/task";

export class TestData {

  static categories: Category[] = [
    {id: 1, title: "Work"},
    {id: 2, title: "Family and home"},
    {id: 3, title: "Study"},
    {id: 4, title: "Vacation"},
    {id: 5, title: "Sport"},
    {id: 6, title: "Food"},
    {id: 7, title: "Finance"},
    {id: 8, title: "Gadgets"},
    {id: 9, title: "Health"},
    {id: 10, title: "Car"},
  ];

  static priorities: Priority[] = [
    {id: 1, title: "Low", color: "#45C01BFF"},
    {id: 2, title: "Mid", color: "#d3c219"},
    {id: 3, title: "High", color: "#ff8800"},
    {id: 4, title: "Very high", color: "#ff0000"}
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: "Refuel the car",
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2022-09-01')
    },
    {
      id: 2,
      title: "Speak with lead",
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2022-08-27')
    },
    {
      id: 3,
      title: "Tidy up the room",
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1],
      date: new Date('2022-08-01')
    },
    {
      id: 4,
      title: "Go for a walk with family",
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2022-09-05')
    },
    {
      id: 5,
      title: "Learn Docker",
      completed: false,
      category: TestData.categories[2]
    },
    {
      id: 6,
      title: "Go on meeting",
      priority: TestData.priorities[1],
      completed: true,
      category: TestData.categories[2],
      date: new Date('2022-08-01')
    },
    {
      id: 7,
      title: "Buy tickets to vacation",
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[3],
    },
    {
      id: 8,
      title: "Cook the dinner",
      completed: false,
      category: TestData.categories[5],
    },
    {
      id: 9,
      title: "Push-up 30 times",
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-10-11')
    },
    {
      id: 10,
      title: "Run 100 meters",
      priority: TestData.priorities[0],
      completed: true,
      category: TestData.categories[4],
    },
    {
      id: 11,
      title: "Organise birthday party",
      completed: false,
      category: TestData.categories[2],
    },
    {
      id: 12,
      title: "Visit lecture on Java development",
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2],
    },
    {
      id: 13,
      title: "Buy groceries",
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[5],
      date: new Date('2022-08-26')
    },
    {
      id: 14,
      title: "Host the meeting",
      completed: false,
      category: TestData.categories[0],
    },
    {
      id: 15,
      title: "Pass the exam on Java development",
      priority: TestData.priorities[2],
      completed: true,
    },
    {
      id: 16,
      title: "Invest $1000",
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[6],
    },
    {
      id: 17,
      title: "Code review",
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6],
    },
    {
      id: 18,
      title: "Pass medical examination",
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[6],
    },
    {
      id: 19,
      title: "Buy new phone",
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2022-10-26')
    },
    {
      id: 20,
      title: "Football with colleagues",
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-09-26')
    },
  ]
}
