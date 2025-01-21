const errorMessages: { [key: number]: string } = {
  1001: "Usuário não encontrado.",
  1002: "Usuário já existe.",
  1003: "Nome de usuário ou senha incorretos.",
  2001: "Livro não encontrado.",
  2002: "Livro já existe.",
  3001: "Execução não encontrada.",
  3002: "Execução já existe.",
  3003: "A execução está na mesma página.",
  2000: "Entidade não processável.",
  3000: "Erro interno no sistema.",
  4000: "Não autorizado.",
};

export function getErrorMessage(code: number): string {
  return errorMessages[code];
}
