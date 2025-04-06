import React, { useState } from "react";
import {
  ActualPlugin,
  ActualPluginEntry,
  Button,
  initializePlugin,
  ModalButtons,
  ModalHeader,
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
            context.navigate("/custom/test");
          }}
          variant="primary"
        >
          Click me
        </Button>
      );
      context.registerSidebarMenu(
        <Button
          onPress={() => {
            context.pushModal(<ModalHelloWorld text="my test" />, {
              name: 'whatever',
              style: {
                width: '200px',
                height: '200px',
              }
            });
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

type ModalHelloWorldProps = {
  text: string;
};

export function ModalHelloWorld({ text }: ModalHelloWorldProps) {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <ModalHeader title={text} />
      <View>
        Hello world!
      </View>
    </>
  );
}
