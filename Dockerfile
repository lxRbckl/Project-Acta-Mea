FROM node:19.5.0


# referencing kubernetes environment #
ENV owner 'lxRbckl'
ENV filepath 'data.json'
ENV branch 'Project-Acta-Mea-5'
ENV guildId '768020237139705857'
ENV tokendiscord ${tokendiscord}
ENV tokenOctokit ${tokenOctokit}
ENV repository 'Project-Acta-Mea'
ENV applicationId '947775678584082453'


WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD ["node", "index.js"]