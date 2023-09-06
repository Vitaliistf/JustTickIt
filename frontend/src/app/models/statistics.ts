export class Statistics {
  id: number;
  title: string;
  completedTotal: number;
  unCompletedTotal: number;


  constructor(id: number, title: string, completedTotal: number, unCompletedTotal: number) {
    this.id = id;
    this.title = title;
    this.completedTotal = completedTotal;
    this.unCompletedTotal = unCompletedTotal;
  }
}
