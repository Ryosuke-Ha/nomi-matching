export interface Chat {
  id: string;
  guestUid: string;
  friendUid: string;
  offerId?: string;
  createdAt: { toDate: () => Date } | string;
  lastMessage?: string;
  isRead: boolean;
  friendName: string;
}
