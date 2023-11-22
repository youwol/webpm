from youwol.app.environment import YouwolEnvironment
from youwol.app.routers.projects import (
    IPipelineFactory,
    BrowserApp,
    Execution,
    Link,
    BrowserAppGraphics,
)
from youwol.pipelines.pipeline_typescript_weback_npm import (
    pipeline,
    PipelineConfig,
    PublishConfig,
)
from youwol.utils.context import Context


class PipelineFactory(IPipelineFactory):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    async def get(self, _env: YouwolEnvironment, context: Context):
        config = PipelineConfig(
            target=BrowserApp(
                displayName="Webpm",
                execution=Execution(standalone=True),
                graphics=BrowserAppGraphics(
                    appIcon=icon(size_px='100%', border_radius='15%', icon_path=app_icon),
                    fileIcon=icon(size_px='100%', border_radius='15%', icon_path=file_icon, bg_size='contain'),
                ),
                links=[
                    Link(name="doc", url="dist/docs/index.html"),
                    Link(name="coverage", url="coverage/lcov-report/index.html"),
                    Link(name="bundle-analysis", url="dist/bundle-analysis.html"),
                ],
            ),
            publishConfig=PublishConfig(
                packagedArtifacts=["dist", "docs", "test-coverage"],
                packagedFolders=["assets"],
            ),
        )
        return await pipeline(config, context)


assets_dir = '/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbQ==/0.2.0-wip/assets'
app_icon = f"url('{assets_dir}/webpm-app.svg')"
file_icon = f"url('{assets_dir}/webpm-file.svg')"


def icon(size_px: str, border_radius: str, icon_path: str, bg_size: str = "cover"):
    return {
        "style": {
            "width": f"{size_px}",
            "height": f"{size_px}",
            "background-image": icon_path,
            "background-size": bg_size,
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "filter": "drop-shadow(rgb(0, 0, 0) 1px 3px 5px)",
            "border-radius": f"{border_radius}",
        }
    }
