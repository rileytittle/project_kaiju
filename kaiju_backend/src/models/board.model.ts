import { Issue } from "./issue.model";
export class Board {
	title: string;
	dateCreated: string;
	issues: Issue[] = [];
	constructor(title: string, dateCreated: string) {
		this.title = title;
		this.dateCreated = dateCreated;
	}
}
