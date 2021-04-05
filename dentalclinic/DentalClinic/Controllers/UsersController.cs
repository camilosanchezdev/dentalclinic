using System;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using DentalClinic.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        MaindbContext _context;
        public UsersController(MaindbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable Get()
        {
            return new string[] { "value1", "value2" };
        }
        [HttpPost("login")]
        public ActionResult login([FromForm] string username, [FromForm] string password)
        {
            var user = _context.users.FirstOrDefault(x => x.name.Equals(username) && x.password.Equals(password));
            if (user != null)
            {
                // Valid user
                var issuer = "https://dentalclinicweb.azurewebsites.net/api/";
                //var issuer = "https://localhost:44347/api/";
                var secretKey = _configuration.GetSection("SecretKey").Value;
                var key = Encoding.ASCII.GetBytes(secretKey);
                var claims = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, GetRole(user.role_id))
                });
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = issuer,
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var createdToken = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new { token = tokenHandler.WriteToken(createdToken) });
            }
            else
            {
                return Ok(new { status = "error", message = "Credenciales inválidas" });
            }
        }
        [HttpPost("validate")]
        public bool ValidateJwtToken([FromForm] string token)
        {
            var secretKey = _configuration.GetSection("SecretKey").Value;
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var issuer = "https://dentalclinicweb.azurewebsites.net/api/";
            //var issuer = "https://localhost:44347/api/";

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidIssuer = issuer,
                    IssuerSigningKey = key
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }
        public string GetRole(int role)
        {
            switch(role)
            {
                case 1:
                    return "administrador";
                case 2:
                    return "especialista";
                default:
                    return "";
            }
        }
    }
}
