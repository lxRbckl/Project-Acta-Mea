FROM node:19.5.0


# referencing kubernetes environment #
ENV owner ${owner}
ENV branch ${branch}
ENV guildId ${guildId}
ENV filepath ${filepath}
ENV repository ${repository}
ENV tokenDiscord ${tokenDiscord}
ENV tokenOctokit ${tokenOctokit}
ENV applicationId ${applicationId}


WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD ["node", "index.js"]