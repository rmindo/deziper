import crypto from 'crypto'


/**
 * Authentication
 */
export default {
  
  /**
   * Stringify
   * @param data - A data to convert
   */
  str(data:any) {
    return JSON.stringify(data)
  },

  /**
   * Hash a string
   * @param data - A string to hash
   */
  hash(data:string) {
    if(data) {
      return crypto.createHash('md5').update(data).digest('hex')
    }
    return data
  },
    
  /**
   * Encode string to base64
   * @param string - A string to encode
   */
  encode(data:string) {
    if(data) {
      return Buffer.from(data).toString('base64').replace(/=/g,'')
    }
    return data
  },

  /**
   * Decode base64 string
   * @param data - A base64 string to decode
   */
  decode(data:string) {
    if(data) {
      return Buffer.from(data, 'base64').toString('utf-8')
    }
    return data
  },
  
  
  /**
   * Signature with HMACSHA256
   * @param key - A secret key
   * @param payload - A payload to sign
   */
  sign(key:string, payload:any) {
    let hmac = crypto.createHmac('sha256', this.encode(key))
    hmac.update(this.str(payload))
    return this.encode(hmac.digest('hex'))
  },
  
  
  /**
   * Random String
   * @param length - A length of characters to be generated
   * @param char - A type of character if true return numbers
   */
  random(length:number = 20, char:boolean = false) {
    let o = ''
    let n = '0123456789'
    let s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    if(char) {
      s = n
    } else {
      s += n
    }
    for(let i = 0; i < length; i++) {
      o += s.charAt(Math.floor(Math.random() * s.length))
    }
    return o
  },
  
  /**
   * Parse authorization
   * @param data - A string to parse
   */
  parse(data:string) {
    try {
      var auth = data.split(' ')
      switch(auth[0]) {
        case 'Basic':
          var de = this.decode(auth[1]).split(':')
          if(de.length == 2) {
            return {
              type: auth[0],
              username: de[0],
              password: de[1],
            }
          }
          return false

        case 'Bearer':
          var en = auth[1].substring(86)
          return {
            type: auth[0],
            token: auth[1],
            signature: en.substring(en.length-86, en.length),
            payload: JSON.parse(this.decode(en.substring(0, en.length-86)))
          }
      }
    }
    catch(e) {
      return null
    }
  },

  
  /**
   * Verify access token
   * @param key 
   * @param payload 
   * @param signature 
   */
  verify(key:string, payload:any, signature:string) {
    if(!key || !payload || !signature) {
      throw ReferenceError('Undefined supplied arguments.')
    }

    // Create buffer with signature
    var sig1 = Buffer.from(signature)
    var sig2 = Buffer.from(this.sign(key, payload))
    /**
     * Check if the same length
     */
    if(sig1.length === sig2.length) {
      // Compare the signature if its correct
      if(crypto.timingSafeEqual(sig1, sig2)) {
        return true
      }
    }
    return false
  },
        
  
  /**
   * Token Expiration
   */
  expiration(exp:any) {
    let date = new Date()
    if(exp.hasOwnProperty('timezon')) {
      date.toLocaleString('en-US', {
        timeZone: exp.timezone
      })
    }
    if(exp.hasOwnProperty('days')) {
      date.setDate(date.getDate()+exp.days)
    }
    return new Date(date).getTime()
  },
  
  
  /**
   * Create Token
   */
  createtoken(payload:any, key:string) {
    if(payload.hasOwnProperty('exp')) {
      payload.exp = this.expiration(payload.exp)
      let signature = this.sign(key, payload)
      if(signature) {
        return this.random(signature.length) + this.encode(this.str(payload)) + signature
      }
    }
    else {
      throw Error('Missing required field "exp"')
    }
  }
}