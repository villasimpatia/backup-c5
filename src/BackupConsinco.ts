import fs from "fs"
import path from "path"
import Bun from "bun"

class BackupConsinco {
  private pathDirBackup: string
  private pathHdBackup: string
  private logError: Bun.BunFile
  private writerErrorFile: Bun.FileSink
  
  constructor(origem: string, destino: string) {
    let folderLog = "logs"
    let now = new Date()
    let timestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    let logErrorName = `log_error_${timestamp}.txt`

    fs.mkdirSync(folderLog, { recursive: true })

    this.pathDirBackup = origem as string
    this.pathHdBackup = destino as string
    this.logError = Bun.file(path.join(folderLog, logErrorName))
    this.writerErrorFile = this.logError.writer()
    this.writerErrorFile.write(` -------------------------------- LOGS DE ERROS ${
      new Date().toLocaleString()
    } --------------------------------\n`)
  }

  ListaArquivos(): string[] {
    const origem = this.pathDirBackup
    let files: string[] = []

    try {
      if(!fs.existsSync(origem)) {
        this.writerErrorFile.write(`Diretório ${origem} não existe\n`)
        return []
      }
      files = fs.readdirSync(origem)
    } catch(e) {
      this.writerErrorFile.write(`Erro ao tentar acessar o diretório ${origem}: ${e}\n`)
      return []
    }

    const extensions = [".dmp", ".gz"]
    return files.filter(file => extensions.some(ext => file.endsWith(ext)))
  }

  CopiarArquivos() {
    const origem = this.pathDirBackup
    const destino = this.pathHdBackup
    const files = this.ListaArquivos()

    try {

      const date = new Date()
      const folderName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      const backupPath = path.join(destino, folderName)

      if(!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true })
      }


      files.forEach(file => {
        const srcFile = path.join(origem, file)
        const destFile = path.join(backupPath, file)

        if(!fs.existsSync(srcFile)) {
          if(this.writerErrorFile) {
            this.writerErrorFile.write(`Arquivo ${file} não encontrado em ${origem}\n`)
          }
          return
        }

        if(fs.existsSync(destFile)) {
          this.writerErrorFile.write(`Arquivo ${file} já existe em ${backupPath}\n`)
          return
        }
        fs.copyFileSync(srcFile, destFile)

      })
    } catch(err) {
      this.writerErrorFile.write(`Erro ao tentar copiar os arquivos: ${err}\n`)
    }
  }
}

export { BackupConsinco }