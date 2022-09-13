using Duende.Bff.Yarp;
using IdentityModel.Client;
using System.IdentityModel.Tokens.Jwt;
using Serilog;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Duende.Bff;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddControllers();

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
            options.Authority = Environment.GetEnvironmentVariable("IDENTITY_SERVER_URI")
                ?? builder.Configuration.GetValue<string>("IdentityServerSettings:ServerUri");
            options.ClientId = "react_bff";
            options.ClientSecret = "secret";
            options.ResponseType = "code";
            options.Scope.Add("tweeter-api");
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

    app.MapControllers()
        .RequireAuthorization()
        .AsBffApiEndpoint();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapBffManagementEndpoints();

        endpoints.MapRemoteBffApiEndpoint("/write", "https://localhost:5050/write")
            .RequireAccessToken(TokenType.User);

        endpoints.MapRemoteBffApiEndpoint("/read", "https://localhost:5050/read")
           .RequireAccessToken(TokenType.User);

        endpoints.MapRemoteBffApiEndpoint("/users", "https://localhost:5050/api/users")
            .RequireAccessToken(TokenType.User);
    });

    app.MapFallbackToFile("index.html"); ;

    app.Run();
}
catch (Exception ex) when (ex.GetType().Name is not "StopTheHostException") // https://github.com/dotnet/runtime/issues/60600
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}