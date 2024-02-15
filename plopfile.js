module.exports = function (plop) {
  plop.setGenerator("module", {
    description: "Criação de um novo módulo",
    prompts: [
      {
        type: "input",
        name: "singular",
        message: "Qual o nome no singular?",
      },
      {
        type: "input",
        name: "plural",
        message: "Qual o nome no plural?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/modules/{{plural}}/entities/{{singular}}Entity.ts",
        templateFile: "./tampletes/module/entities/Entity.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/infra/databases/{{plural}}Repository.ts",
        templateFile: "./tampletes/module/infra/databases/Repository.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/infra/databases/Mock{{plural}}Repository.ts",
        templateFile: "./tampletes/module/infra/databases/MockRepository.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/I{{plural}}Repository.ts",
        templateFile: "./tampletes/module/repositories/IRepository.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/index.ts",
        templateFile: "./tampletes/module/repositories/types/index.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/ICreate{{singular}}.ts",
        templateFile: "./tampletes/module/repositories/types/ICreate.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/IDelete{{singular}}.ts",
        templateFile: "./tampletes/module/repositories/types/IDelete.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/Find{{singular}}ByID.ts",
        templateFile: "./tampletes/module/repositories/types/IFindByID.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/IList{{plural}}ByID.ts",
        templateFile: "./tampletes/module/repositories/types/IList.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/repositories/types/IUpdate{{singular}}.ts",
        templateFile: "./tampletes/module/repositories/types/IUpdate.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Create{{singular}}.ts",
        templateFile: "./tampletes/module/useCases/Create.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Create{{singular}}.unit.spec.ts",
        templateFile: "./tampletes/module/useCases/Create.unit.spec.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Delete{{singular}}.ts",
        templateFile: "./tampletes/module/useCases/Delete.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Delete{{singular}}.unit.spec.ts",
        templateFile: "./tampletes/module/useCases/Delete.unit.spec.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Find{{singular}}ByID.ts",
        templateFile: "./tampletes/module/useCases/FindByID.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/Find{{singular}}ByID.unit.spec.ts",
        templateFile: "./tampletes/module/useCases/FindByID.unit.spec.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/List{{plural}}.ts",
        templateFile: "./tampletes/module/useCases/List.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{plural}}/useCases/List{{plural}}.unit.spec.ts",
        templateFile: "./tampletes/module/useCases/List.unit.spec.hbs",
      },
    ],
  });
};
