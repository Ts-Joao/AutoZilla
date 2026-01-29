import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import slugify from "slugify";

interface CategoryParams {
    id: number;
    name: string;
    slug: string;
    photoUrl: string | null;
}

export async function GET() {
    const categories: CategoryParams[] = await prisma.category.findMany();
    return NextResponse.json(categories);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, photoUrl } = body
    const slug = slugify(name, { lower: true })

    const newCategory = await prisma.category.create({
        data: {
            name,
            slug,
            photoUrl
        }
    })
    return NextResponse.json(newCategory);
}