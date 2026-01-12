export interface Download {
	id: string;
	title: string;
	date: string;
	fileUrl: string;
	imageUrl?: string;
	category: string;
	downloadCount: number;
}
import { ObjectId } from "mongodb";

export interface Blog {
	_id: ObjectId;
	blogTitle: string;
	blogDate: string;
	// Add other properties as needed
}

export interface Event {
	_id?: ObjectId;
	name: string;
	date: Date;
	location: string;
	description: string;
}
