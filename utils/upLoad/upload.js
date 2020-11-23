export const FileUpLoad=(tempFilePath)=>{
  return new Promise((resolve, reject) => {
    const BASE_UPLOAD_URL = 'http://127.0.0.1:3000/updata'
    wx.uploadFile({
      url: BASE_UPLOAD_URL,
      filePath: tempFilePath,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
      },
      success: (res)=> {
        resolve(res)
      }, fail: (err)=> {
        reject(err)
      }
    })
  })
}