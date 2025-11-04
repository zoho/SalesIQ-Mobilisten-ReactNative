type ChatStatus = "WAITING" | "CONNECTED" | "MISSED"   | "CLOSED"   | "WAITING"  | "TRIGGERED" | "PROACTIVE";

export interface SalesIQChat {
	id?: string;
	unreadCount?: number;
	isBotAttender?: boolean;
	queuePosition?: number;
	question?: string;
	departmentName?: string;
	status?: ChatStatus;
	lastMessage?: string;
	lastMessageSender?: string;
	lastMessageTime?: string;
	recentMessage?: {
		text?: string;
		sender?: string;
		time?: string;
		is_read?: string;
		file?: {
			name?: string;
			content_type?: string;
			comment?: string;
			size?: string;

		}
	};
	attenderName?: string;
	attenderID?: string;
	attenderEmail?: string;
	feedback?: string;
	rating?: string;
}