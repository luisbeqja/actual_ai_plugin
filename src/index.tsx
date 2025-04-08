import React from "react";
import {
  ActualPlugin,
  ActualPluginEntry,
  Button,
  initializePlugin,
  View,
} from "@actual-app/plugins-core";
import manifest from "./manifest";
import { ModalHelloWorld } from "./ModalHelloWorld";

let pluginContext: Parameters<ActualPlugin['activate']>[0];

const pluginEntry: ActualPluginEntry = () => {
  const plugin: ActualPlugin = {
    name: manifest.name,
    version: manifest.version,
    uninstall: () => {},
    activate: (context) => {
      pluginContext = context;
      context.on("categories", (data) => {
        console.log("From plugin", data);
      });
      context.registerRoute("/test", <View>Simple JSX</View>);
      context.registerSidebarMenu("before-accounts",
        <Button
          onPress={() => {
            context.navigate("/custom/test");
          }}
          variant="primary"
        >
          Click me
        </Button>
      );
      context.registerSidebarMenu("after-accounts",
        <Button
          onPress={() => {
            context.pushModal(<ModalHelloWorld text="my test" context={pluginContext} />);
          }}
          variant="primary"
        >
          Modal?
        </Button>
      );
      console.log("Dummy activated");
    },
  };

  return initializePlugin(plugin);
};
export default pluginEntry;