import { prisma } from "../../../../db/prisma"

export default async function handler(req, res) {
    const userId = req.query.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(userId),
        }
    })
    res.json(deletedUser)
}
