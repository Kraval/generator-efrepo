using <%= repoProjectName %>.Models;
using System;


namespace <%= repoProjectName %>.Infrastructure
{
    public interface IDatabaseFactory : IDisposable
    {
        <%= contextName %> Get();
    }
}
