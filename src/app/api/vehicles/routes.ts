import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { VehicleDto } from "@/src/dto/vehicle.dto";

export async function GET() {
    try {
        const vehicles: VehicleDto[] = await prisma.vehicle.findMany({
            where: { sponsored: true, status: "AVAILABLE" },
            orderBy: { createdAt: "desc" },
            include: {
                model: {
                    include: {
                        brand: true
                    }
                },
                photos: {
                    where: { isMain: true },
                    take: 1
                }
            }
        });

        const response: VehicleDto[] = vehicles.map((vehicles) => {
            return {
                id: vehicles.id,
                slug: vehicles.slug,
                year: vehicles.year,
                price: vehicles.price,
                brand: vehicles.brand,
                model: vehicles.model,
                version: vehicles.version,
                mileage: vehicles.mileage,
                sponsored: vehicles.sponsored,
                city: vehicles.city,
                state: vehicles.state,
                transmission: vehicles.transmission,
                inspected: vehicles.inspected,
                armored: vehicles.armored,
                thumbnailUrl: vehicles.thumbnailUrl,
            }
        })

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar veículos" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { vehicleModelId, version, year, price, category, mileage, city, state, plateFinal, fuelType, condition, color, transmission, armored, features, photos } = body
        const newVehicle = await prisma.vehicle.create({
            data: {
                version,
                year,
                price,
                category,
                mileage,
                city,
                state,
                plateFinal,
                fuelType,
                condition,
                color,
                transmission,
                armored,
                features,
                vehicleModelId,
            }
        })

        if (photos && Array.isArray(photos) && photos.length > 0) {
            const photosData = photos.map(
                (photo: { url: string; isMain?: boolean }) => ({
                    url: photo.url,
                    isMain: photo.isMain ?? false,
                    vehicleId: newVehicle.id
                })
            )
            await prisma.vehicle.createMany({
                data: photosData
            })
        }
        return NextResponse.json(newVehicle, { status: 201 });
    }
     catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao criar veículo" }, { status: 500 })
    }
}