import React from "react";
import {
  ActualPlugin,
  ActualPluginEntry,
  Button,
  initializePlugin,
  View,
} from "@actual-app/plugins-core";
import manifest from "./manifest";

const pluginEntry: ActualPluginEntry = () => {
  const plugin: ActualPlugin = {
    name: manifest.name,
    version: manifest.version,
    uninstall: () => {},
    activate: (context) => {
      context.on("account-add", (data) => {
        console.log("From plugin", data);
      });
      context.registerRoute("/test", <View>Simple JSX</View>);
      context.registerSidebarMenu(
        <Button
          onPress={() => {
            context.actions.navigate("/custom/test");
          }}
          variant="primary"
        >Click me</Button>
      );
      console.log("Dummy activated");
    },
  };

  return initializePlugin(plugin);
};
export default pluginEntry;
