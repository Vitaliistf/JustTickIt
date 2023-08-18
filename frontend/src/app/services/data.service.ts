import {Injectable} from '@angular/core';
import {Category} from "../models/category";
import {TestData} from "../data/test.data";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor() {
    }

    getCategories(): Category[] {
        return TestData.categories;
    }
}
