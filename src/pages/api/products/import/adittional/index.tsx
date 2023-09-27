import { prisma } from "../../../../../db/prisma"
import xlsx from 'xlsx';
import fs from 'fs'; // Import the 'fs' module
import { IncomingForm } from "formidable-serverless";
import { Product } from "../../../../../../types/types";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao processar o arquivo' });
            }

            const { file } = files;

            if (!file) {
                return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
            }

            try {
                const fileBuffer = fs.readFileSync(file.path);

                const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const data: Product[] = xlsx.utils.sheet_to_json(sheet);

                for (const item of data) {
                    if (!item.name || !item.unity || !item.price || !item.supplier || !item.quantity) {
                        return res.status(400).json({ error: 'Todos os campos obrigatórios devem estar preenchidos dentro da planilha.' });
                    }
                }


                // Faça a inserção dos dados no banco de dados usando o Prisma
                for (const item of data) {
                    console.log(item)

                    await prisma.product.create({
                        data: {
                            name: item.name,
                            unity: item.unity,
                            price: Number(item.price),
                            supplier: item.supplier,
                            quantity: item.quantity,

                            // Mapeie os campos do modelo conforme necessário
                        }
                    });

                    console.log(item)

                }


                return res.status(200).json({ message: 'Planilha importada com sucesso' });
            }
            catch (error) {
                return res.status(500).json({ error: 'Erro ao importar a planilha' });
            }
        });

    } else {
        return res.status(405).json({ error: 'Método não permitido' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};