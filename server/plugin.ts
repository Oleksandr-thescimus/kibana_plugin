import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { KibanaPluginPluginSetup, KibanaPluginPluginStart } from './types';
import { defineRoutes } from './routes';

export class KibanaPluginPlugin
  implements Plugin<KibanaPluginPluginSetup, KibanaPluginPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('kibana_plugin: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('kibana_plugin: Started');
    return {};
  }

  public stop() {}
}
