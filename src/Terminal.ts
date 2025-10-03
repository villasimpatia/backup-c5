import { BackupConsinco } from "./BackupConsinco"

export class Terminal {
  private origem: string
  private destino: string
  private listaDownload: BackupConsinco

  constructor() {
    this.origem = Bun.env.PATH_BACKUP as string
    this.destino = Bun.env.PATH_HD as string
    this.listaDownload = new BackupConsinco(this.origem, this.destino)
  }

  IniciarBackup() {
    this.listaDownload.CopiarArquivos() // inicia cópia

    // Espera 5 minutos antes de iniciar monitoramento
    setTimeout(() => {
      console.log("Iniciando monitoramento do backup")

      const progresso = setInterval(() => {
        const arrDocs = this.listaDownload.ListaArquivos()
        if (arrDocs.length < 71) {
          console.log("Backup não completo", arrDocs.length, "/ 71")
        } else {
          console.log("Backup completo!")
          clearInterval(progresso) // para o monitoramento quando completo
        }
      }, 600_000) // verifica a cada 10 minutos

    }, 300_000) // espera 5 minutos antes de começar
  }
}
