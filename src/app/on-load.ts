import { render } from '@youwol/rx-vdom'
import { aboutYouwolModule } from '@youwol/os-widgets'
export const AboutYwModule = await aboutYouwolModule()
import { AppView } from './app.view'

export {}

document.getElementById('content').appendChild(render(new AppView()))
