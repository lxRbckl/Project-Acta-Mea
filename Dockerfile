FROM node:19.5.0


# referencing docker compose #
ENV tokenDiscord ${tokenDiscord}
ENV tokenOctokit ${tokenOctokit}

ENV guildId ${guildId}
ENV channelId ${channelId}
ENV applicationId ${applicationId}

ENV owner ${owner}
ENV branch ${branch}
ENV filepath ${filepath}
ENV repository ${repository}

ENV port 2375
ENV hostIP ${hostIP}


WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD ["node", "index.js"]
