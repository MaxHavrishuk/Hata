Set it up in the Package manager console, when the issue "roslyn/could not found path" appears

Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r


ABBYY Sha 256 getPassword
https://help.abbyy.com/en-us/flexicapture/12/developer/createuser

public static string GetPasswordHashWithSalt( string login, string password )
        {
            string salt = GetPasswordSha256Hash(login.ToUpper());
            return GetPasswordSha256Hash(password + salt);
        }
        private static string GetPasswordSha256Hash( string password )
        {
            Encoding enc = Encoding.GetEncoding("UTF-16");
            byte[] buffer = enc.GetBytes(password);
            var cryptoTransformSHA256 = new SHA256CryptoServiceProvider();
            string hash = BitConverter.ToString(cryptoTransformSHA256.ComputeHash(buffer)).Replace("-", "");
            return hash;
        }
    
