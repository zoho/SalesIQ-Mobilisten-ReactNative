export interface Resource {
	id?: string;
    category?: ResourceCategory;
    title?: string;
    departmentId?: string;
    language?: Language;
    creator?: User;
    modifier?: User;
    createdTime?: number;
    modifiedTime?: number;
    publicUrl?: string;
    stats?: Stats;
    content?: string;
    ratedType?: "liked" | "disliked";
}

interface ResourceCategory {
	id?: string;
    name?: string
}

interface Language {
	code?: string;
    id?: string;
}

interface User {
	displayName?: String,
	email?: String,
	id: String
	imageUrl?: String,
	name?: String
}

interface Stats {
	disliked?: number;
	liked?: number;
	used?: number;
	viewed?: number;
}

export interface Category {
    count?: number;
    childrenCount?: number;
    order?: number;
    id?: string;
    resourceModifiedTime?: number;
    departmentId?: string;
    name?: string
}