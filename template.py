import shutil
from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import (
    Template,
    PackageType,
    Dependencies,
    RunTimeDeps,
    generate_template,
    DevServer,
    Bundles,
    MainModule,
)
from youwol.utils import parse_json

folder_path = Path(__file__).parent

pkg_json = parse_json(folder_path / "package.json")

externals = {
    "@youwol/webpm-client": "^3.0.0",
    "@youwol/rx-code-mirror-editors": "^0.4.1",
    "@youwol/rx-vdom": "^1.0.1",
    "@youwol/rx-group-views": "^0.3.0",
    "rxjs": "^7.5.6",
    "@youwol/http-clients": "^3.0.0",
    "@youwol/http-primitives": "^0.2.0",
    "@youwol/os-widgets": "^0.2.2",
}

template = Template(
    path=folder_path,
    type=PackageType.Application,
    name=pkg_json["name"],
    version=pkg_json["version"],
    shortDescription=pkg_json["description"],
    author=pkg_json["author"],
    dependencies=Dependencies(
        runTime=RunTimeDeps(externals=externals),
        devTime={
            "lz-string": "^1.4.4",
            # Required until rx-vdom#1.0.1 is shipped
            "conditional-type-checks": "^1.0.6"
        }
    ),
    bundles=Bundles(
        mainModule=MainModule(
            entryFile="./main.ts", loadDependencies=list(externals.keys())
        )
    ),
    userGuide=True,
    devServer=DevServer(port=3017),
)

generate_template(template)
shutil.copyfile(
    src=folder_path / ".template" / "src" / "auto-generated.ts",
    dst=folder_path / "src" / "auto-generated.ts",
)
for file in [
    "README.md",
    ".gitignore",
    ".npmignore",
    ".prettierignore",
    "LICENSE",
    "package.json",
    # "tsconfig.json", need to reference rx-vdom-config.ts
    "webpack.config.ts",
]:
    shutil.copyfile(src=folder_path / ".template" / file, dst=folder_path / file)
