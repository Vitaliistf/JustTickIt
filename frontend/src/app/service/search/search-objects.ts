export class SimpleSearchValue {
    title: string | null = null;
}

export class TaskSearchValues {

    title = '';
    completed: number | null = null;
    priorityId: number | null = null;
    categoryId: number | null = null;
    pageNumber = 0;
    pageSize = 5;

    sortColumn = 'title';
    sortDirection = 'asc';

}
