import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { BrowserRouter as Router } from '@kbn/shared-ux-router';
import { EuiButton, EuiHorizontalRule, EuiPageTemplate, EuiTitle, EuiText } from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface KibanaPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const KibanaPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: KibanaPluginAppDeps) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/kibana_plugin/example').then((res) => {
      setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('kibanaPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPageTemplate restrictWidth="1000px">
            <EuiPageTemplate.Header>
              <EuiTitle size="l">
                <h1>
                  <FormattedMessage
                    id="kibanaPlugin.helloWorldText"
                    defaultMessage="{name}"
                    values={{ name: PLUGIN_NAME }}
                  />
                </h1>
              </EuiTitle>
            </EuiPageTemplate.Header>
            <EuiPageTemplate.Section>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="kibanaPlugin.congratulationsTitle"
                    defaultMessage="Congratulations, you have successfully created a new Kibana Plugin!"
                  />
                </h2>
              </EuiTitle>
              <EuiText>
                <p>
                  <FormattedMessage
                    id="kibanaPlugin.content"
                    defaultMessage="Look through the generated code and check out the plugin development documentation."
                  />
                </p>
                <EuiHorizontalRule />
                <p>
                  <FormattedMessage
                    id="kibanaPlugin.timestampText"
                    defaultMessage="Last timestamp: {time}"
                    values={{ time: timestamp ? timestamp : 'Unknown' }}
                  />
                </p>
                <EuiButton type="primary" size="s" onClick={onClickHandler}>
                  <FormattedMessage id="kibanaPlugin.buttonText" defaultMessage="Get data" />
                </EuiButton>
              </EuiText>
            </EuiPageTemplate.Section>
          </EuiPageTemplate>
        </>
      </I18nProvider>
    </Router>
  );
};
