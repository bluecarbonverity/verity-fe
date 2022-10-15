import axios from 'axios'

export const requestFile = async cid => {
  try {
    const res = await axios(`${process.env.REACT_APP_IPFS_GATEWAY_URL}${cid}`)

    const { data } = res

    return data
  } catch (error) {
    console.log(error)
    // onError({ error })
  }
}

export const uploadFile = async (file, onError) => {
  const formData = new FormData()
  formData.append('file', file)

  const config = {
    method: 'POST',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    maxContentLength: Infinity,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    },
    data: formData,
  }

  try {
    const res = await axios(config)
    return String(res.data.IpfsHash)
  } catch (error) {
    console.log(error)
    // onError({ error })
  }
}

export const uploadJSON = async (data, onError) => {
  const config = {
    method: 'POST',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    maxContentLength: Infinity,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    },
    data: data,
  }

  try {
    const res = await axios(config)
    return String(res.data.IpfsHash)
  } catch (error) {
    console.log(error)
    // onError({ error })
  }
}
