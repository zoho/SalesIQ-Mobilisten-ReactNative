/**
 * Represents a visitor and the tracking information SalesIQ has gathered about them,
 * such as location, device, and visit history.
 */
export interface SalesIQVisitor {
  /** The visitor's name. */
  name?: string;
  /** The visitor's email address. */
  email?: string;
  /** The visitor's phone/contact number. */
  phone?: string;
  /** The total number of chats the visitor has initiated. */
  numberOfChats?: string;
  /** The visitor's city, resolved from their IP address. */
  city?: string;
  /** The visitor's state or province, resolved from their IP address. */
  state?: string;
  /** The visitor's region, resolved from their IP address. */
  region?: string;
  /** The visitor's ISO country code, resolved from their IP address. */
  countryCode?: string;
  /** The visitor's IP address. */
  ip?: string;
  /** The time of the visitor's first visit. */
  firstVisitTime?: string;
  /** The time of the visitor's most recent visit. */
  lastVisitTime?: string;
  /** The operating system of the visitor's device. */
  os?: string;
  /** The browser used by the visitor. */
  browser?: string;
  /** The total time the visitor has spent across all visits. */
  totalTimeSpent?: string;
  /** The total number of visits made by the visitor. */
  numberOfVisits?: string;
  /** The number of distinct days on which the visitor has visited. */
  noOfDaysVisited?: string;
  /** The search engine that referred the visitor, if any. */
  searchEngine?: string;
  /** The search query the visitor used to reach the site, if any. */
  searchQuery?: string;
}
