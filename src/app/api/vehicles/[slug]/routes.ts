import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"
import { VehicleDetailsDto } from "@/src/dto/vehicle.dto";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const vehicle: VehicleDetailsDto = await prisma.vehicle.findUnique({
            where:{ slug: params.slug },
            include: {
                model: {
                    include: {
                        brand: true
                    }
                },
                owner: true,
                category: true,
                photos: true
            }
        })

        if(!vehicle) {
            return NextResponse.json({ message: "Veículo não encontrado", status: 404})
        }

        const response: VehicleDetailsDto = {
            id: vehicle.id,
            slug: vehicle.slug,
            year: vehicle.year,
            price: vehicle.price,
            brand: vehicle.brand,
            model: vehicle.model,
            version: vehicle.version,
            mileage: vehicle.mileage,
            sponsored: vehicle.sponsored,
            city: vehicle.city,
            state: vehicle.state,
            transmission: vehicle.transmission,
            inspected: vehicle.inspected,
            armored: vehicle.armored,
            thumbnailUrl: vehicle.thumbnailUrl,
            color: vehicle.color,
            status: vehicle.status,
            ownerId: vehicle.ownerId,
            photos: vehicle.photos,
            fuelType: vehicle.fuelType,
            category: vehicle.category,
            ownerName: vehicle.ownerName,
            condition: vehicle.condition,
            plateFinal: vehicle.plateFinal,
            features: vehicle.features,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar veículo" }, { status: 500 })
    }
}