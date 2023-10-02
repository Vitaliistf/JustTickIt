export class DashboardData {
  completedTotal: number | undefined;
  uncompletedTotal: number | undefined;

  constructor(completedTotal?: number, uncompletedTotal?: number) {
    this.completedTotal = completedTotal;
    this.uncompletedTotal = uncompletedTotal;
  }
}
