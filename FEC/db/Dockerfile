# Derived from official mysql image-version 5.7
FROM mysql:5.7

# Add a database
ENV MYSQL_DATABASE robinhood_stock_chart

# Add the content of the sql-scripts/ directory to the image
# All scripts in docker-entrypoint-initdb.d/ are automatically executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/