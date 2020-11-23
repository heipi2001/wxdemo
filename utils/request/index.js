export const request=(params,port)=>{
  return new Promise((resolve,reject)=>{
    const BASEURL = 'http://127.0.0.1:' + port + '/'
    // const BASEURL = 'http://10.2.252.195:' + port + '/'
    
    wx.request({
      ...params,
      url: BASEURL + params.url,
      success:(res) =>{
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}