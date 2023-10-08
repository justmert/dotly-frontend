# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the package.json, package-lock.json, and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --production=false

# Copy the necessary configurations and source code
COPY next.config.js postcss.config.js tailwind.config.ts tsconfig.json ./
COPY public/ public/
COPY src/ src/

# Build the Next.js application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "dev"]
