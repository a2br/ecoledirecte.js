FROM gitpod/workspace-full

# Install Node
RUN bash -c ". .nvm/nvm.sh && \
        nvm install node --latest-npm && \
        nvm alias default node"

# Install npm global modules
# RUN npm install -g nodemon typescript eslint prettier
