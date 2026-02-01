import { FuelType, VehicleCondition, VehicleColor, TransmissionType, VehicleFeature, VehicleStatus } from "@/src/lib/prisma-types";

export interface VehicleDto {
    id: string;
    slug: string;
    year: number;
    price: number;
    brand: string;
    model: string;
    version: string;
    mileage: number;
    sponsored: boolean;
    city: string;
    state: string;
    transmission: TransmissionType;
    inspected: boolean;
    armored: boolean;
    thumbnailUrl: string;
}

export interface VehicleDetailsDto extends VehicleDto {
    color: VehicleColor;
    status: VehicleStatus;
    ownerId: number;
    photos: string[];
    fuelType: FuelType;
    category: string;
    ownerName: string;
    condition: VehicleCondition;
    plateFinal: string;
    features: VehicleFeature[];
}