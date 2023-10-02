import {Priority} from "./priority";
import {Category} from "./category";

export class Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;
  oldCategory?: Category;

  constructor(id: number, title: string, completed: boolean,
              priority?: Priority, category?: Category, date?: Date, oldCategory?: Category) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.date = date;
    this.oldCategory = oldCategory;
  }
}

