export class CreateEventDto {
  title: string;
  date: Date;
  imageUrl?: string;
  detail?: string;
  barId: number;
  userId: number;
}
