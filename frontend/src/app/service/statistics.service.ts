import {Observable} from "rxjs";
import {Statistics} from "../models/statistics";

export interface StatisticsService {

  getStatistics(): Observable<Statistics>;

}
