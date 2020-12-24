using DotNetOpenAuth.GoogleOAuth2;
using Microsoft.AspNet.Membership.OpenAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HataCom.App_Start
{
    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            GoogleOAuth2Client clientGoog = new GoogleOAuth2Client("1077378655557-n7ldnl85nttemapcvqfvj4n7cccf23d4.apps.googleusercontent.com", "y5YBXukN6kpT2I55DpjTWwiq");
            IDictionary<string, string> extraData = new Dictionary<string, string>();
            OpenAuth.AuthenticationClients.Add("google", () => clientGoog, extraData);
        }
    }
}