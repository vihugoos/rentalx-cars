export interface ICarImage {
    id: string;
    car_id: string;
    image_name: string;
    image_url(): string;
    created_at: Date;
}
