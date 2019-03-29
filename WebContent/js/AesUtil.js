/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
var AesUtil = function(keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};
function Encrypt(plainText)
{
	var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
	var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
	var keySize = 128;
	var iterationCount = 100;
	var passPhrase = $('#aesphassphrase').val();
	if(passPhrase==null || passPhrase==""){
	 passPhrase = "aesalgoisbestbes";
	}
	var aesUtil = new AesUtil(keySize, iterationCount);
	var encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainText);
	return encrypt;	    
}
AesUtil.prototype.generateKey = function(salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
}

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
