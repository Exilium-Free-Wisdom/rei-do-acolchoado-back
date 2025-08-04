const sessions = {}

export const getSession = (number) => {
    if (!sessions[number]) {
        sessions[number] = { etapa: 0, dados: {} }
    }
    return sessions[number]
}

export const clearSession = (number) => {
    delete sessions[number]
}