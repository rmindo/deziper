import crypto from 'crypto'

/**
 * Stringify
 * 
 * @param data Data to convert
 */
export function toStr(data: object) {
  return JSON.stringify(data)
}

/**
 * Hash a string
 * 
 * @param data String to hash
 */
export function hash(data: string, algo: string = 'sha1') {
  return crypto.createHash(algo).update(data).digest('hex')
}

/**
 * Encode string to base64
 * 
 * @param string - String to encode
 */
export function encode(data: string) {
  return Buffer.from(data).toString('base64').replace(/=/g,'')
}

/**
 * Decode base64 string
 * 
 * @param data Base64 string to decode
 */
export function decode(data: string) {
  return Buffer.from(data, 'base64').toString('utf-8')
}

/**
 * Signature with HMACSHA256
 * 
 * @param key Secret key
 * @param payload Payload to sign
 */
export function sign(key: string, payload: object) {
  let hmac = crypto.createHmac('sha256', hash(key))
  hmac.update(toStr(payload))
  return encode(hmac.digest('hex'))
}

/**
 * Verify access token
 * 
 * @param key Secret key
 * @param payload Payload to verify
 * @param signature Current signature
 */
export function verify(key: string, payload: object, signature: string) {
  /**
   * Create buffer with signature
   */
  var sig1 = Buffer.from(signature)
  var sig2 = Buffer.from(sign(key, payload))
  /**
   * Check if the same length
   */
  if(sig1.length === sig2.length) {
    /**
     * Compare the signature if its correct
     */
    if(crypto.timingSafeEqual(sig1, sig2)) {
      return true
    }
  }
  return false
}