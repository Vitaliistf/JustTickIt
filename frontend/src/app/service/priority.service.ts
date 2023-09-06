import {AbstractService} from "./abstract.service";
import {Priority} from "../models/priority";
import {SimpleSearchValue} from "./search/search-objects";
import {Observable} from "rxjs";

export interface PriorityService extends AbstractService<Priority> {

  find(categorySearchValue: SimpleSearchValue): Observable<any>;

}
