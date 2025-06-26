# Backend Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet restore
EXPOSE 7039
CMD ["dotnet", "watch", "run", "--urls", "https://0.0.0.0:7039"]
