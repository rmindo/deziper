export interface DateTimeInterface {
  date: Date,
  today: Date,
  getDate(): string
  getFullDate(): string,
  getDateAndDay(): string,
}

export interface PostDateInterface {
  updated: string,
  created: string,
  published: string,
}

export interface DateInterface {
  updated: DateTimeInterface,
  published: DateTimeInterface,
  isUpdated: (date?: DateTimeInterface) => boolean
}