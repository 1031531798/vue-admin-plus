
/**
 * @description 根据二进制数据下载文件
 * @param {二进制数据源} ref
 * @param {文件名} fileName
 */
export function downloadByBlob (ref: Blob, fileName: string) {
  console.log(ref);
  const blob = new Blob([ref], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}

// 打开文件选择
export function openFileSelect (): Promise<FileList| null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.addEventListener('change', () => {
      resolve(input.files)
    })
  })
}
