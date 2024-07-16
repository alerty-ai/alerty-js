import path from "path";
import fs from "fs";

const PACKAGES_DIR = path.resolve(__dirname, "../packages");

const listPackages = async () => {
  const packages = (
    await fs.promises.readdir(PACKAGES_DIR, { withFileTypes: true })
  ).filter(
    (packageName) => packageName.isDirectory() && packageName.name !== "core",
  );
  return packages.map((packageName) => packageName.name);
};

const updatePackageVersion = async (packageName: string, version: string) => {
  const packageJsonPath = path.resolve(
    PACKAGES_DIR,
    packageName,
    "package.json",
  );
  const packageJson = await readPackageJson(packageName);
  packageJson.dependencies["@alerty/core"] = version;
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
};

const readPackageJson = async (packageName: string) => {
  const packageJsonPath = path.resolve(
    PACKAGES_DIR,
    packageName,
    "package.json",
  );
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
};

const main = async () => {
  const version = (await readPackageJson("core")).version;
  const packages = await listPackages();

  console.info(`Updating @alerty/core to v${version} for all packages`);
  for (const packageName of packages) {
    console.info(`- @alerty/${packageName}`);
    await updatePackageVersion(packageName, version);
  }
};

main();
