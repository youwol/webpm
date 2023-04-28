from youwol.environment import YouwolEnvironment
from youwol.routers.projects import IPipelineFactory, BrowserApp, Execution, Link, BrowserAppGraphics
from youwol.pipelines.pipeline_typescript_weback_npm import pipeline, PipelineConfig, PublishConfig
from youwol_utils.context import Context


class PipelineFactory(IPipelineFactory):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    async def get(self, _env: YouwolEnvironment, context: Context):
        config = PipelineConfig(target=BrowserApp(
            displayName="@youwol/welcome",
            execution=Execution(
                standalone=True
            ),
            graphics=BrowserAppGraphics(
                appIcon={'class': 'far fa-laugh-beam fa-2x'},
                fileIcon={}
            ),
            links=[
                Link(name="doc", url="dist/docs/index.html"),
                Link(name="coverage", url="coverage/lcov-report/index.html"),
                Link(name="bundle-analysis", url="dist/bundle-analysis.html")
            ]
        ),
            publishConfig=PublishConfig(packagedArtifacts=['dist', 'docs', 'assets', 'test-coverage'])
        )
        return await pipeline(config, context)
