import Link from "next/link";

function FunctionCard({ image, link }) {

    return (
        <Link href={link}>
            <div className="p-4 bg-zinc-400 w-40 flex justify-center rounded-lg text-white shadow-md">
                <div>
                    <img className="w-20" src={image} />
                    <p className="font-bold mt-2">Usuários</p>
                </div>
            </div>
        </Link>

    )
}

export default FunctionCard;