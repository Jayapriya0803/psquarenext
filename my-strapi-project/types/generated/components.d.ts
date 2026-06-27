import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAboutHighlights extends Struct.ComponentSchema {
  collectionName: 'components_components_about_highlights';
  info: {
    displayName: 'about.highlights';
  };
  attributes: {
    point: Schema.Attribute.String;
  };
}

export interface ComponentsAboutServices extends Struct.ComponentSchema {
  collectionName: 'components_components_about_services';
  info: {
    displayName: 'about.services';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'components.link', false>;
    subheading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.about-highlights': ComponentsAboutHighlights;
      'components.about-services': ComponentsAboutServices;
      'components.link': ComponentsLink;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}
