﻿using System;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace HataCom
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}
	}

   
    
}
