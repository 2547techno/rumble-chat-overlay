export type User = {
	id: string;
	username: string;
	isFollower: boolean;
	profilePicture?: string;
	color: string;
};

export type Message = {
	id: string;
	timestamp: string;
	text: string;
	from: User;
};

export class MessageList {
	messages: Message[];
	size: number;

	constructor(size: number) {
		this.messages = [];
		this.size = size;
	}

	add(msgs: Message[]) {
		for (const msg of msgs) {
			this.addMessage(msg);
		}
	}

	addMessage(msg: Message) {
		if (this.messages.length >= this.size) {
			this.messages.shift();
		}
		this.messages.push(msg);
	}
}
