export interface User {
    pk: number
    email: string
    username: string
    first_name: string
    last_name: string
}

export interface RegisterPayload {
    username: string
    email: string
    password1: string
    password2: string
}
