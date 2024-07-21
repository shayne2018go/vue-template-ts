FROM rippleone-docker.pkg.coding.net/ripple-basicimage/nginx/nginx:latest

RUN echo "daemon off;" >> /etc/nginx/nginx.conf && mkdir -p /srv/dist 

COPY serverconf /etc/nginx/sites-enabled/serverconf

COPY dist/ /srv/dist/

RUN chmod -R 755 /srv/dist

EXPOSE 80
    
CMD nginx

MAINTAINER ripple