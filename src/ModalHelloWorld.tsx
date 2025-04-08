import { ActualPlugin, Button, ModalHeader, View } from '@actual-app/plugins-core';
import React, { useState } from 'react';

type ModalHelloWorldProps = {
    text: string;
    context: Parameters<ActualPlugin['activate']>[0];
  };
  
  export function ModalHelloWorld({ text, context }: ModalHelloWorldProps) {
    const [counter, setCounter] = useState(0);
    return (
      <>
        <ModalHeader title={text} />
        <View>
          Hello world!
          <Button variant="primary" onPress={() => {
            context.popModal();
          }}>Close this modal</Button>
        </View>
      </>
    );
  }
  