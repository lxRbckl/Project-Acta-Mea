FROM node:19.5.0


# referencing docker compose <
ENV tokenDiscord ${tokenDiscord}
ENV tokenOctokit ${tokenOctokit}

ENV port ${port}
ENV host ${host}

ENV file ${file}
ENV owner ${owner}
ENV branch ${branch}
ENV repository ${repository}

ENV guildId ${guildId}
ENV channelID ${channelId}
ENV applicationId ${applicationId}

# >


WORKDIR /app
COPY . .
RUN npm install


CMD ["node", "dist/app.js"]