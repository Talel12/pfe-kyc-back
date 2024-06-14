import type { Schema, Attribute } from '@strapi/strapi';

export interface DfssdfDsfdsf extends Schema.Component {
  collectionName: 'components_dfssdf_dsfdsfs';
  info: {
    displayName: 'dsfdsf';
  };
  attributes: {
    sdfdsf: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dfssdf.dsfdsf': DfssdfDsfdsf;
    }
  }
}
