import gql from 'graphql-tag';
import { Schema } from '../graphql';
import { BundlerMain } from './bundler.main.runtime';
import { Component } from '../component';

export function devServerSchema(bundler: BundlerMain): Schema {
  return {
    typeDefs: gql`
      extend type Component {
        server: ComponentServer
      }

      type ComponentServer {
        env: String
        url: String
      }
    `,
    resolvers: {
      Component: {
        server: (component: Component) => {
          const componentServer = bundler.getComponentServer(component);
          if (!componentServer) return {};

          return {
            env: componentServer.context.envRuntime.id,
            url: componentServer.url,
          };
        },
      },
    },
  };
}