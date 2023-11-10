import shutil
from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import Template, PackageType, Dependencies, \
    RunTimeDeps, generate_template, DevServer, Bundles, MainModule
from youwol.utils import parse_json

folder_path = Path(__file__).parent

pkg_json = parse_json(folder_path / 'package.json')

externals = {
    "@youwol/cdn-client": "^2.0.0",
    "@youwol/flux-view": "^1.0.3",
    "@youwol/fv-code-mirror-editors": "^0.3.1",
    "rxjs": "^6.5.5",
    "@youwol/http-clients": "^2.0.5",
    "@youwol/http-primitives": "^0.1.2"
}

template = Template(
    path=folder_path,
    type=PackageType.Application,
    name=pkg_json['name'],
    version=pkg_json['version'],
    shortDescription=pkg_json['description'],
    author=pkg_json['author'],
    dependencies=Dependencies(
        runTime=RunTimeDeps(
            externals=externals
        )
    ),
    bundles=Bundles(
      mainModule=MainModule(
          entryFile='./main.ts',
          loadDependencies=list(externals.keys())
      )
    ),
    userGuide=True,
    devServer=DevServer(
        port=3017
    )
)

generate_template(template)
shutil.copyfile(
    src=folder_path / '.template' / 'src' / 'auto-generated.ts',
    dst=folder_path / 'src' / 'auto-generated.ts'
)
for file in ['README.md', '.gitignore', '.npmignore', '.prettierignore', 'LICENSE', 'package.json',
             'tsconfig.json', 'webpack.config.ts']:
    shutil.copyfile(
        src=folder_path / '.template' / file,
        dst=folder_path / file
    )
