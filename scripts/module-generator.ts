import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const toPascalCase = (value: string): string => {
  return value
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, char) =>
      char ? char.toUpperCase() : ""
    )
    .replace(/^./, (char) => char.toUpperCase());
};

const toCamelCase = (value: string): string => {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const writeFile = (filePath: string, content: string) => {
  if (fs.existsSync(filePath)) {
    console.log(`⚠ Skipped existing file: ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, content);
  console.log(`✓ Created: ${filePath}`);
};

// --------------------------------------------------
// Controller
// --------------------------------------------------

const generateController = (moduleName: string): string => {
  return `import { Request, Response, NextFunction } from "express";
import ${moduleName}Service from "../services/${moduleName}Service";

const ${moduleName}Controller = {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ${moduleName}Service.getAll();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ${moduleName}Service.getById(
        req.params.id
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ${moduleName}Service.create(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ${moduleName}Service.update(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await ${moduleName}Service.remove(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default ${moduleName}Controller;
`;
};

// --------------------------------------------------
// Service
// --------------------------------------------------

const generateService = (moduleName: string): string => {
  return `import ${moduleName}Repository from "../repositories/${moduleName}Repository";

const ${moduleName}Service = {
  async getAll() {
    return ${moduleName}Repository.findAll();
  },

  async getById(id: string) {
    return ${moduleName}Repository.findById(id);
  },

  async create(data: unknown) {
    return ${moduleName}Repository.create(data);
  },

  async update(id: string, data: unknown) {
    return ${moduleName}Repository.update(id, data);
  },

  async remove(id: string) {
    return ${moduleName}Repository.remove(id);
  },
};

export default ${moduleName}Service;
`;
};

// --------------------------------------------------
// Repository
// --------------------------------------------------

const generateRepository = (moduleName: string): string => {
  return `import { prisma } from "../../../config/prisma";

const ${moduleName}Repository = {
  async findAll() {
    // TODO: Implement Prisma query
    return [];
  },

  async findById(id: string) {
    // TODO: Implement Prisma query
    return null;
  },

  async create(data: unknown) {
    // TODO: Implement Prisma query
    return data;
  },

  async update(id: string, data: unknown) {
    // TODO: Implement Prisma query
    return data;
  },

  async remove(id: string) {
    // TODO: Implement Prisma query
    return null;
  },
};

export default ${moduleName}Repository;
`;
};

// --------------------------------------------------
// Routes
// --------------------------------------------------

const generateRoutes = (moduleName: string): string => {
  return `import { Router } from "express";
import ${moduleName}Controller from "../controllers/${moduleName}Controller";

const router = Router();

router.get(
  "/",
  ${moduleName}Controller.getAll
);

router.get(
  "/:id",
  ${moduleName}Controller.getById
);

router.post(
  "/",
  ${moduleName}Controller.create
);

router.patch(
  "/:id",
  ${moduleName}Controller.update
);

router.delete(
  "/:id",
  ${moduleName}Controller.remove
);

export default router;
`;
};

// --------------------------------------------------
// Types
// --------------------------------------------------

const generateTypes = (moduleName: string): string => {
  const typeName = toPascalCase(moduleName);

  return `export interface Create${typeName}Input {
  // TODO: Define create input
}

export interface Update${typeName}Input {
  // TODO: Define update input
}
`;
};

// --------------------------------------------------
// Validation
// --------------------------------------------------

const generateValidation = (moduleName: string): string => {
  const typeName = toPascalCase(moduleName);

  return `import { z } from "zod";

export const create${typeName}Schema = z.object({
  // TODO: Define validation schema
});

export const update${typeName}Schema = z.object({
  // TODO: Define validation schema
});
`;
};

// --------------------------------------------------
// Generator
// --------------------------------------------------

rl.question("Enter the module name: ", (input) => {
  if (!input.trim()) {
    console.error("✗ Module name is required.");
    rl.close();
    return;
  }

  const moduleName = toCamelCase(input);

  const modulePath = path.join(
    process.cwd(),
    "src",
    "modules",
    moduleName
  );

  const folders = [
    modulePath,
    path.join(modulePath, "controllers"),
    path.join(modulePath, "services"),
    path.join(modulePath, "repositories"),
    path.join(modulePath, "routes"),
    path.join(modulePath, "types"),
    path.join(modulePath, "validation"),
  ];

  // Create directories
  folders.forEach((folder) => {
    fs.mkdirSync(folder, { recursive: true });
  });

  // Create files
  writeFile(
    path.join(
      modulePath,
      "controllers",
      `${moduleName}Controller.ts`
    ),
    generateController(moduleName)
  );

  writeFile(
    path.join(
      modulePath,
      "services",
      `${moduleName}Service.ts`
    ),
    generateService(moduleName)
  );

  writeFile(
    path.join(
      modulePath,
      "repositories",
      `${moduleName}Repository.ts`
    ),
    generateRepository(moduleName)
  );

  writeFile(
    path.join(
      modulePath,
      "routes",
      `${moduleName}Routes.ts`
    ),
    generateRoutes(moduleName)
  );

  writeFile(
    path.join(
      modulePath,
      "types",
      `${moduleName}Type.ts`
    ),
    generateTypes(moduleName)
  );

  writeFile(
    path.join(
      modulePath,
      "validation",
      `${moduleName}Validation.ts`
    ),
    generateValidation(moduleName)
  );

  console.log("");
  console.log(`✓ Module "${moduleName}" generated successfully.`);
  console.log("");

  rl.close();
});
