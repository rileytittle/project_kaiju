export class Issue {
	title: string;
	status: string;
	dueDate: Date;
	constructor(title: string, status: string, dueDate: Date) {
		this.title = title;
		this.status = status;
		this.dueDate = dueDate;
	}
}
