export type Product = {
    id?: number;
    name: string;
    unity ?: string;
    price: number;
    quantity ?: number;
    price_amount ?: number;
}

export type User = {
    id?:    number;
    email:  string;
    image?: string;
    name:   string;
    phone?: string;
    cpf?:   string;
    role:   number | string;
    password?: string;
}
