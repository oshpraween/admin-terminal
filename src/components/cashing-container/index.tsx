import { KeepAlive } from 'react-activation';
import React from 'react';

export function withKeepAlive(name: string) {
  return function <P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function (props: P) {
      return (
        <KeepAlive name={name}>
          <WrappedComponent {...props} />
        </KeepAlive>
      );
    };
  };
}
