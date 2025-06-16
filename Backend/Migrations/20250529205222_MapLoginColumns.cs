using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smartcore.Migrations
{
    /// <inheritdoc />
    public partial class MapLoginColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "login",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "login",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "login",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "password",
                table: "login",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "login",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "login",
                newName: "Id");
        }
    }
}
