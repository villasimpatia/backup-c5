# 🚀 Backup C5

![License: MIT](https://img.shields.io/badge/License-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-<3-blue)
![Bun](https://img.shields.io/badge/Bun-Compatible-yellow)

Sistema de backup desenvolvido para copiar arquivos de um diretório de origem para um HD de destino, monitorando o progresso e garantindo que todos os arquivos sejam transferidos corretamente.

---

## ✨ Funcionalidades

* 📁 Cópia de arquivos entre diretórios
* ⏱️ Monitoramento do progresso do backup
* ✅ Logs indicando backup completo ou incompleto
* ⏸️ Pausa inicial configurável antes de iniciar o monitoramento
* 🔄 Suporte a múltiplos arquivos e pastas

---

## 🛠 Tecnologias

* **TypeScript**
* **Bun.js**
* **Node.js** (opcional)
* **Git** para versionamento

---

## ⚡ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/villasimpatia/backup-c5.git
```

2. Acesse a pasta do projeto:

```bash
cd backup-c5
```

3. Instale as dependências:

```bash
bun install
# ou
npm install
```

4. Configure as variáveis de ambiente:

```bash
export PATH_BACKUP=/caminho/do/backup
export PATH_HD=/caminho/do/hd
```

---

## 🏃‍♂️ Uso

1. Importe a classe `Terminal`:

```ts
import { Terminal } from "./Terminal";
```

2. Crie uma instância e inicie o backup:

```ts
const terminal = new Terminal();
terminal.IniciarBackup();
```

* O backup iniciará a cópia dos arquivos.
* Após a pausa configurada, o sistema começará a monitorar o progresso.
* Logs indicarão quando o backup estiver completo ou incompleto.

---

## 📂 Estrutura do Projeto

```
backup-c5/
├─ Terminal.ts         # Classe principal para gerenciamento do backup
├─ BackupConsinco.ts   # Classe responsável pela cópia e listagem de arquivos
├─ README.md           # Documentação do projeto
└─ ...                 # Outros arquivos e configurações
```

---

## 🤝 Contribuição

Pull requests são bem-vindos!
Para mudanças importantes, abra uma issue primeiro para discutir o que deseja modificar.

---

## 📝 Licença

MIT License
