FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /db
COPY . .
ENV ACCEPT_EULA Y
ENV SA_PASSWORD superSecurePassword123++
ENV MSSQL_SA_PASSWORD superSecurePassword123++

USER root
RUN apt-get update -y && apt-get install -y dos2unix
RUN chmod +x ./preload.sh && dos2unix ./preload.sh

CMD ["/bin/bash", "-c", "./preload.sh & /opt/mssql/bin/sqlservr"]