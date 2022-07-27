import { copySync } from "fs-extra"
import { join } from "path"

let saveOriginFilePath: string | undefined
let originSaveDir: string | undefined
const BACKUP_DIR_NAME = "sso-backup"
const WINDOWS_DIR_SEPARATOR = "\\"

function addListeners() {
  document.querySelector("#saveOriginFile")?.addEventListener("change", event => {
    saveOriginFilePath = (event.target as HTMLInputElement)?.files?.[0]?.path
    console.log("changed value of save origin file", saveOriginFilePath);

    const input: HTMLInputElement | undefined = document.querySelector("#saveOriginFilePath")
    originSaveDir = saveOriginFilePath?.split(WINDOWS_DIR_SEPARATOR)?.slice(0, -1).join(WINDOWS_DIR_SEPARATOR)
    console.log("originSaveDir", originSaveDir)
    if (input && originSaveDir) {
      input.value = originSaveDir
    }
  });

  document.querySelector("#createBackupButton")?.addEventListener("click", () => {
    console.log("click on create backup button")
    try {
      copySync(
        originSaveDir,
        getBackupDirName(),
        { overwrite: true }
      )
      console.log("backup created!")
    } catch (error) {
      console.error("error on creating backup", error)
    }
  })

  document.querySelector("#restoreBackupButton")?.addEventListener("click", () => {
    console.log("click on restore backup button")
    try {
      copySync(
        getBackupDirName(),
        originSaveDir,
        { overwrite: true }
      )
      console.log("backup restored!")
    } catch (error) {
      console.error("error on restoring backup", error)
    }
  })
}

function getBackupDirName(): string {
  const parentDir = originSaveDir.split(WINDOWS_DIR_SEPARATOR).slice(0, -1).join(WINDOWS_DIR_SEPARATOR)
  return join(parentDir, BACKUP_DIR_NAME)
}


// main
document.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded")

  addListeners()
})