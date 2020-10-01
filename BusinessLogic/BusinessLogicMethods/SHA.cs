using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BusinessLogicMethods
{
	public static class SHA
	{
		public static string GetPasswordHashWithSalt(string login, string password)
		{
			string salt = GetPasswordSha256Hash(login.ToUpper());
			return GetPasswordSha256Hash(password + salt);
		}
		private static string GetPasswordSha256Hash(string password)
		{
			Encoding enc = Encoding.GetEncoding("UTF-16");
			byte[] buffer = enc.GetBytes(password);
			var cryptoTransformSHA256 = new SHA256CryptoServiceProvider();
			string hash = BitConverter.ToString(cryptoTransformSHA256.ComputeHash(buffer)).Replace("-", "");
			return hash;
		}
	}
}
