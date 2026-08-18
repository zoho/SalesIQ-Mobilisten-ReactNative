/** A knowledge base resource (article) and its metadata. */
export interface Resource {
  /** The resource's unique identifier. */
  id?: string;
  /** The category the resource belongs to. */
  category?: ResourceCategory;
  /** The resource's title. */
  title?: string;
  /** The identifier of the department the resource belongs to. */
  departmentId?: string;
  /** The language of the resource. */
  language?: Language;
  /** The user who created the resource. */
  creator?: User;
  /** The user who last modified the resource. */
  modifier?: User;
  /** The time the resource was created. */
  createdTime?: number;
  /** The time the resource was last modified. */
  modifiedTime?: number;
  /** The public URL of the resource. */
  publicUrl?: string;
  /** Engagement statistics for the resource. */
  stats?: Stats;
  /** The resource's body content. */
  content?: string;
  /** The current visitor's rating on the resource, if any. */
  ratedType?: 'liked' | 'disliked';
}

/** The category a {@link Resource} belongs to. */
interface ResourceCategory {
  /** The category's unique identifier. */
  id?: string;
  /** The category's name. */
  name?: string;
}

/** The language of a {@link Resource}. */
interface Language {
  /** The language code. */
  code?: string;
  /** The language's unique identifier. */
  id?: string;
}

/** A user (operator) referenced by a {@link Resource}, such as its creator or modifier. */
interface User {
  /** The user's display name. */
  displayName?: String;
  /** The user's email address. */
  email?: String;
  /** The user's unique identifier. */
  id: String;
  /** The URL of the user's image. */
  imageUrl?: String;
  /** The user's name. */
  name?: String;
}

/** Engagement statistics for a {@link Resource}. */
interface Stats {
  /** The number of dislikes. */
  disliked?: number;
  /** The number of likes. */
  liked?: number;
  /** The number of times the resource was used. */
  used?: number;
  /** The number of times the resource was viewed. */
  viewed?: number;
}

/** A knowledge base resource (article) category. */
export interface Category {
  /** The number of resources in the category. */
  count?: number;
  /** The number of child categories. */
  childrenCount?: number;
  /** The display order of the category. */
  order?: number;
  /** The category's unique identifier. */
  id?: string;
  /** The time a resource in the category was last modified. */
  resourceModifiedTime?: number;
  /** The identifier of the department the category belongs to. */
  departmentId?: string;
  /** The category's name. */
  name?: string;
}
