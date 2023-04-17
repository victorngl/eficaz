import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const estimates = await prisma.estimate.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        include: {
            status: true,
        }
    })
    
    res.json(estimates)
}
