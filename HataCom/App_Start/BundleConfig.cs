﻿using System.Web;
using System.Web.Optimization;

namespace HataCom
{
	public class BundleConfig
	{
		// For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
						"~/Scripts/jquery.validate*"));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
						"~/Scripts/modernizr-*"));

			//STYLES FOR SITE BEGIN
			//Main Page styles CSS
			bundles.Add(new StyleBundle("~/MainPage/css").Include(
					  "~/Content/Styles/MainPage.css"
					  ));

			//Auth Page styles CSS
			bundles.Add(new StyleBundle("~/AuthPage/css").Include(
					  "~/Content/Styles/Auth.css"
					  ));

			//PhotoAlbums Page styles CSS
			bundles.Add(new StyleBundle("~/PhotoAlbumsPage/css").Include(
					  "~/Content/Styles/PhotoAlbums.css"
					  ));

			//Photos Page styles CSS
			bundles.Add(new StyleBundle("~/PhotosPage/css").Include(
					  "~/Content/Styles/Photos.css"
					  ));

			//STYLES FOR SITE END


			//SCRIPTS FOR SITE BEGIN
			//PhotoAlbums Script
			bundles.Add(new ScriptBundle("~/Auth.js").Include(
				"~/Scripts/CustomScripts/Auth.js"));

			//PhotoAlbums Script
			bundles.Add(new ScriptBundle("~/PhotoAlbums.js").Include(
				"~/Scripts/CustomScripts/PhotoAlbums.js"));

			//Photos Script
			bundles.Add(new ScriptBundle("~/Photos.js").Include(
				"~/Scripts/CustomScripts/Photos.js"));
			//SCRIPTS FOR SITE END



			//Бандли для сторінки музики
			//bundles.Add(new ScriptBundle("~/Scripts/js").Include("~/Scripts/musicPlayer.js"));
			//bundles.Add(new StyleBundle("~/Content/Music/css").Include("~/Content/MusicStyles.css"));
		}
	}

}
