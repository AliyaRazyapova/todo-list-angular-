export class Task {
  id: number;
  title: string;
  note: string;

  constructor(title: string = '', note: string = '', id: number = -1) {
    this.title = title;
    this.note = note;
    this.id = id;
  }
}
