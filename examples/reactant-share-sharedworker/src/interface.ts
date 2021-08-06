export interface Main {
  help(options: { text: string }): Promise<{ text: string }>;
}

export interface Worker {
  hello(options: { num: number }): Promise<{ text: string }>;
}
