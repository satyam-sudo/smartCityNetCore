//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using smartcore.Data;
//using smartcore.Modals;

//namespace smartcore.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class LoginController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public LoginController(AppDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginRequest request)
//        {
//            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
//                return BadRequest(new { message = "Email and password are required" });

//            var user = await _context.Login.FirstOrDefaultAsync(u => u.Email == request.Email);

//            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
//                return Unauthorized(new { message = "Invalid credentials" });

//            return Ok(new
//            {
//                message = "Login successful",
//                user = new { user.Email }
//            });
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] LoginRequest request)
//        {
//            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
//                return BadRequest(new { message = "Email and password are required" });

//            if (await _context.Login.AnyAsync(u => u.Email == request.Email))
//                return BadRequest(new { message = "User already exists" });

//            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

//            var newUser = new Login
//            {
//                Email = request.Email,
//                Password = hashedPassword
//            };

//            _context.Login.Add(newUser);
//            await _context.SaveChangesAsync();

//            return Ok(new { message = "User registered successfully" });
//        }
//    }
//}



using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using smartcore.Data;
using smartcore.Modals;

namespace smartcore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Email and password are required" });

            var user = await _context.Login.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || user.Password != request.Password)
                return Unauthorized(new { message = "Invalid credentials" });

            return Ok(new
            {
                message = "Login successful",
                user = new { user.Email }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Email and password are required" });

            if (await _context.Login.AnyAsync(u => u.Email == request.Email))
                return BadRequest(new { message = "User already exists" });

            var newUser = new Login
            {
                Email = request.Email,
                Password = request.Password
            };

            _context.Login.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }
    }
}
