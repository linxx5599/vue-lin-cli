#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

async function main() {
  // -v --version
  program.option("-v, --version").action(() => console.log(`v1.0.0`));

  // 定义一个新的命令 "create"，用于生成模板 create my-project
  program
    .command("create")
    .description("生成一个新的 Vue3 模板")
    .action(async () => {
      console.log("欢迎使用 Vue3 模板生成工具");
      // 定义要询问用户的问题
      const questions = [
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称：",
          default: "my-project",
          validate: (value) => {
            if (value.trim() === "") {
              return "项目名称不能为空";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "fileType",
          message: "要生成哪个模板?",
          choices: ["TypeScript", "JavaScript"],
        },
      ];
      // 使用 inquirer 库向用户询问问题
      let answers;
      try {
        answers = await inquirer.prompt(questions);
      } catch {
        console.log("模板生成失败");
        return;
      }
      const { projectName, fileType } = answers;
      const all = [fs.mkdir(projectName)];
      const common = fs.copy(
        path.join(
          dirname(fileURLToPath(import.meta.url)),
          "../templates/common"
        ),
        "./"
      );
      all.push(common);
      if (fileType === "TypeScript") {
        const ts = fs.copy(
          path.join(dirname(fileURLToPath(import.meta.url)), "../templates/ts"),
          projectName
        );
        all.push(ts);
      } else {
        const js = fs.copy(
          path.join(dirname(fileURLToPath(import.meta.url)), "../templates/js"),
          projectName
        );
        all.push(js);
      }
      console.log("生成模板中...");
      try {
        await Promise.all(all);
        console.log("模板成功创建");
      } catch {
        console.log("模板生成失败");
      }
    });
  // 解析命令行参数并执行程序
  program.parse(process.argv);
}

// 调用 main 函数
main();
