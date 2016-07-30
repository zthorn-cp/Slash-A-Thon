using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(slash_a_thon.Startup))]

namespace slash_a_thon
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
