using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Bounzy.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/bouncy").Include(
                        "~/content/scripts/lib/underscore.min.js",
                        "~/content/scripts/lib/postal.min.js",
                        "~/content/scripts/rectangle.js",
                        "~/content/scripts/rgba.js",
                        "~/content/scripts/monster.js",
                        "~/content/scripts/player.js", 
                        "~/content/scripts/app.js"));
        }
    }
}