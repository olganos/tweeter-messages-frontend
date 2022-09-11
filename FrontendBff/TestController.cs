using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FrontendBff
{
    [Route("test")]
    [Authorize]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var token = await HttpContext.GetUserAccessTokenAsync();

            //return Ok(new List<ToDo>()
            //{
            //    new ToDo { Id = ToDo.NewId(), Date = DateTimeOffset.UtcNow, Name = "Demo ToDo API", User = "bob" },
            //    new ToDo { Id = ToDo.NewId(), Date = DateTimeOffset.UtcNow.AddHours(1), Name = "Stop Demo", User = "bob" },
            //    new ToDo { Id = ToDo.NewId(), Date = DateTimeOffset.UtcNow.AddHours(4), Name = "Have Dinner", User = "alice" },
            //});

            return Ok(token);
        }
    }
}

public class ToDo
{
    static int _nextId = 1;
    public static int NewId()
    {
        return _nextId++;
    }

    public int Id { get; set; }
    public DateTimeOffset Date { get; set; }
    public string Name { get; set; }
    public string User { get; set; }
}
