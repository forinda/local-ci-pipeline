import path from "path";
import shell from "shelljs";
import app_paths from "./src/paths.js";

function getRequiredConfig() {
  const paths = app_paths.KEYS_PATH;
  const privateKey = `${paths}/private`;
  const publicKey = `${paths}/public.pub`;
  const sourcePath = path.resolve(app_paths.BASE_PATH);
  const destinationPath = `~/apps/${path.basename(sourcePath)}`;
  return {
    privateKey,
    publicKey,
    sourcePath,
    sshPort: 3309,
    destinationPath,
    user: "orinda",
    host: "localhost",
  };
}

function deployCode() {
  const { privateKey, sourcePath, destinationPath, user, host, sshPort } =
    getRequiredConfig();

  // Create directory on the remote server
  shell.exec(
    `ssh -i ${privateKey} -p ${sshPort} -o StrictHostKeyChecking=no ${user}@${host} mkdir -p ${destinationPath}`
  );

  // Deploy code using rsync
  shell.exec(
    `rsync -avz -e "ssh -i ${privateKey} -p ${sshPort} -o StrictHostKeyChecking=no" --progress --delete --exclude .git --exclude node_modules ${sourcePath}/ ${user}@${host}:${destinationPath}/`
  );
  // Cd into the directory and run the docker-compose file
  shell.exec(
    `ssh -i ${privateKey} -p ${sshPort} -o StrictHostKeyChecking=no ${user}@${host} "cd ${destinationPath} && docker-compose up -d --build"`
  );
}

deployCode();
