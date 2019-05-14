import fs from 'fs'
import EventEmitter from 'events'

export default class FileWatcher {
  private watchers: { [fileName: string]: fs.FSWatcher } = {}

  private ee: EventEmitter = new EventEmitter()

  public add = (file: string | string[]) => {
    const fileNames = typeof file === 'string' ? [file] : file

    fileNames.forEach((fileName) => {
      this.watchers[fileName] = fs.watch(fileName, () => {
        this.ee.emit('change', fileName)
      })
    })

    return this
  }

  public remove = (file: string | string[]) => {
    const fileNames = typeof file === 'string' ? [file] : file

    fileNames.forEach((fileName) => {
      const watcher = this.watchers[fileName]

      if (watcher) watcher.close()
      delete this.watchers[fileName]
    })

    return this
  }

  public clear = () => {
    const fileNames = Object.keys(this.watchers)
    this.remove(fileNames)
  }

  public on = (event: 'change', listener: (filename: string) => any) => {
    this.ee.on(event, listener)
    return this
  }

  public off = (event: 'change', listener: (filename: string) => any) => {
    this.ee.off(event, listener)
    return this
  }
}
