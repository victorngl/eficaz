import { prisma } from "../../../../db/prisma"

export default async function handler(req, res) {
    const { id } = req.body
    
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: req.body,
    })
    
    res.json(updatedUser)

}
