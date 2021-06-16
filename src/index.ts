import {getOptions} from 'loader-utils';
import {validate} from 'schema-utils';
import {parse} from 'node-html-parser';
// eslint-disable-next-line node/no-unpublished-import
import type * as webpack from 'webpack';
import type {Schema} from 'schema-utils/declarations/validate';

interface LoaderOptions {
  id?: string;
  overwrite?: boolean;
  selector?: string;
}

const defaultOptions: Required<LoaderOptions> = {
  id: 'root',
  overwrite: false,
  selector: 'svg',
};

const schema: Schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    overwrite: {
      type: 'boolean',
    },
    selector: {
      type: 'string',
    },
  },
};

async function svgIdLoader(
  this: webpack.LoaderContext<LoaderOptions>,
  content: string
) {
  try {
    const options = getOptions(this) as LoaderOptions;

    validate(schema, options, {
      name: 'svgid loader',
      baseDataPath: 'options',
    });

    const root = parse(content);

    const svgElements = root.querySelectorAll(
      options.selector ?? defaultOptions.selector
    );

    if (svgElements.length !== 1) {
      return content;
    }

    const [svgElement] = svgElements;

    if (!svgElement.hasAttribute('id') || options.overwrite) {
      svgElement.setAttribute('id', options.id ?? defaultOptions.id);
    }

    return root.toString();
  } catch (err) {
    return content;
  }
}
export default svgIdLoader;
