using Duende.Bff.Yarp;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services
    .AddBff()
    .AddRemoteApis();

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = "Cookies";
        options.DefaultChallengeScheme = "oidc";
        options.DefaultSignOutScheme = "oidc";
    })
    .AddCookie("Cookies", options =>
    {
        options.Cookie.SameSite = SameSiteMode.Strict;
    })
    .AddOpenIdConnect("oidc", options =>
    {
        options.Authority = "https://localhost:5001";
        options.ClientId = "react_bff";
        options.ClientSecret = "secret";
        options.ResponseType = "code";
        options.Scope.Add("api1");
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("verification");
        options.Scope.Add("fullname");
        options.SaveTokens = true;
        options.GetClaimsFromUserInfoEndpoint = true;
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();

app.UseBff();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapBffManagementEndpoints();
});

app.MapFallbackToFile("index.html"); ;

app.Run();

//using Duende.Bff.Yarp;

//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();
//builder.Services.AddBff()
//    .AddRemoteApis();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = "cookie";
//    options.DefaultChallengeScheme = "oidc";
//    options.DefaultSignOutScheme = "oidc";
//}).AddCookie("cookie", options =>
//{
//    options.Cookie.Name = "__Host-bff";
//    options.Cookie.SameSite = SameSiteMode.Strict;
//}).AddOpenIdConnect("oidc", options =>
//{
//    options.Authority = "https://demo.duendesoftware.com";
//    options.ClientId = "interactive.confidential";
//    options.ClientSecret = "secret";
//    options.ResponseType = "code";
//    options.ResponseMode = "query";

//    options.GetClaimsFromUserInfoEndpoint = true;
//    options.MapInboundClaims = false;
//    options.SaveTokens = true;

//    options.Scope.Clear();
//    options.Scope.Add("openid");
//    options.Scope.Add("profile");
//    options.Scope.Add("api");
//    options.Scope.Add("offline_access");

//    options.TokenValidationParameters = new()
//    {
//        NameClaimType = "name",
//        RoleClaimType = "role"
//    };
//});

//var app = builder.Build();

//app.UseStaticFiles();
//app.UseRouting();
//app.UseAuthentication();
//app.UseBff();
//app.UseAuthorization();
//app.MapBffManagementEndpoints();

//app.MapControllers()
//    .RequireAuthorization()
//    .AsBffApiEndpoint();

//// app.MapRemoteBffApiEndpoint("/todos", "https://localhost:5020/todos")
////     .RequireAccessToken(Duende.Bff.TokenType.User);

//app.MapFallbackToFile("index.html"); ;

//app.Run();

