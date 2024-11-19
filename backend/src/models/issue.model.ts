export class Issue {
	title: string;
	status: string;
	dateCreated: string;
	dueDate: Date | null;
	constructor(
		title: string,
		status: string,
		dateCreated: string,
		dueDate: Date
	) {
		this.title = title;
		this.status = status;
		this.dateCreated = dateCreated;
		this.dueDate = dueDate;
	}
}
