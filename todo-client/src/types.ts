export interface Todo {
    id: number
    text: string
    completed: boolean
    createdAt: string
    modifiedAt: string
}

export type TodoTemplate = Pick<Todo, "text" | "completed">