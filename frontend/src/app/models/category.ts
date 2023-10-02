export class Category {
  id: number;
  title: string;
  completedCount?: number;
  uncompletedCount?: number;


  constructor(id: number, title: string, completedCount?: number, uncompletedCount?: number) {
    this.id = id;
    this.title = title;

    this.completedCount = completedCount ? completedCount : 0;

    this.uncompletedCount = uncompletedCount ? uncompletedCount : 0;
  }
}
