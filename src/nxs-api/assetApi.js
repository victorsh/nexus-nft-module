const {
  utilities: {
    apiCall,
    secureApiCall,
    showErrorDialog,
    showSuccessDialog,
  }
} = NEXUS

const assetApi = {
  create: async (_params) => {
    const params = {
      format: 'JSON',
      json: [
        {
          name: 'serial_number',
          type: 'uint64',
          value: '123456789123456789',
          mutable: 'true'
        }
      ]
    }
  
    const path = 'assets/create/asset'
  
    try {
      const result = await secureApiCall(path, params)
      showSuccessDialog({
        message: 'Asset Created!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to create asset.'
      })
    }
  },
  get: async (addr) => {
    const params = { address: addr }
    const path = 'assets/get/asset'
    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset',
        note: JSON.stringify(result, null, 2)
      });
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to get asset',
      })
    }
  },
  update: async (_params) => {
    const params = {
      pin: '',
      address: '87sJDgMXfLBAbK7jmLFcCDzDTcTGZ7QfxBbkQxJsHThFtLcbPfy',
      serial_number: '113'
    }
  
    const path = 'assets/update/asset'
  
    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset Updated!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to update asset.'
      })
    }
  },
  transfer: async (_params) => {
    const params = {
      pin: '', 
      name: '', // optional if address
      address: '', // optional if name
      username: '', // optional if destination
      destination: '', // optional if username
      expires: '', // optional
    }

    const path = 'assets/transfer/asset'

    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset Transferred!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to transfer asset.'
      })
    }
  },
  claim: async (_params) => {
    const params = {
      pin: '',
      txid: '', // asset txid 
      name: '', // rename asset?
    }

    const path = 'assets/claim/asset'
    
    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset Claimed!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to claim asset.'
      })
    }
  },
  list: async (_params) => {
    const params = {
      name: '', // optional if address
      address: '' // optional if name
    }

    const path = 'assets/list/asset/history'

    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset Listed!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to list asset history.'
      })
    }
  },
  tokenize: async (_params) => {
    const params = {
      pin: '',
      name: '', // asset name. optional if address
      address: '', // asset address. optional if name
      token_name: '', // name of token to be used to tokenize asset
      token: '' // address of token to be used to tokenize asset
    }

    const path = 'assets/tokenize/asset'

    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Asset Tokenized!',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to tokenize asset.'
      })
    }
  },
  schema: async (_params) => {
    const params = {

    }

    const path = 'assets/get/schema'

    try {
      const result = await apiCall(path, params)
      showSuccessDialog({
        message: 'Got Asset Schema',
        note: JSON.stringify(result, null, 2)
      })
    } catch (err) {
      console.log(err)
      showErrorDialog({
        message: 'Failed to get asset schema.'
      })
    }
  }
}

export default assetApi
