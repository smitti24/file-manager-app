import fs from "fs";
import { promisify } from "util";

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const realpath = promisify(fs.realpath);

const buildDirectoryProperties = async (currentWorkingDirectory, file) => {
  const directoryItem = currentWorkingDirectory
    ? `${currentWorkingDirectory}`
    : file;

  let statsObj = await stat(directoryItem);
  let fullPath = await realpath(directoryItem);

  const fileProprties = {
    name: file,
    size: statsObj.size,
    type: statsObj.isFile() ? "file" : "directory",
    fullPath,
    createdDate: statsObj.birthtime,
  };

  return fileProprties;
};

export const getAllDirectoryContents = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const size = parseInt(pageSize, 10);

  if (pageNumber < 1) {
    return res
      .status(400)
      .json({ message: "Page number must be a positive integer" });
  }

  if (size < 1) {
    return res
      .status(400)
      .json({ message: "Page size must be a positive integer" });
  }

  try {
    const currentDirectoryFiles = await readdir(process.cwd());

    const directoryContent = await Promise.all(
      currentDirectoryFiles
        .slice((pageNumber - 1) * size, pageNumber * size)
        .map((directoryItem) => buildDirectoryProperties(null, directoryItem)) // pass directoryItem as file argument
    );

    res.status(200).json({
      data: directoryContent,
      total: currentDirectoryFiles.length,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getDirectoryContent = async (req, res) => {
  const { directoryPath, page = 1, pageSize = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const size = parseInt(pageSize, 10);

  if (!directoryPath) {
    return res.status(400).json({ message: "Directory path is required" });
  }

  if (pageNumber < 1) {
    return res
      .status(400)
      .json({ message: "Page number must be a positive integer" });
  }

  if (size < 1) {
    return res
      .status(400)
      .json({ message: "Page size must be a positive integer" });
  }

  try {
    const currentDirectoryContent = await readdir(directoryPath);

    const directoryContent = await Promise.all(
      currentDirectoryContent
        .slice((pageNumber - 1) * size, pageNumber * size)
        .map(async (directoryItem) => {
          const currentWorkingDirectory = `${directoryPath}/${directoryItem}`;
          return buildDirectoryProperties(
            currentWorkingDirectory,
            directoryItem
          );
        })
    );

    res.status(200).json({
      data: directoryContent,
      total: currentDirectoryContent.length,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
