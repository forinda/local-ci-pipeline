import path from "path";
import findRoot from "find-root";

const root = findRoot(process.cwd());

const app_paths = {
  BASE_PATH: root,
  SRC_PATH: path.resolve(root, "src"),
  KEYS_PATH: path.resolve(root, "keys"),
  PUBLIC_PATH: path.resolve(root, "public"),
  UPLOADS_PATH: path.resolve(root, "public/uploads"),
};
console.log(app_paths);
export default app_paths;
