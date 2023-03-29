FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["factorial-challenge.csproj", "./"]
RUN dotnet restore "factorial-challenge.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "factorial-challenge.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "factorial-challenge.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "factorial-challenge.dll"]
