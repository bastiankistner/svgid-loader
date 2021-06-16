# svgid-loader

Simple loader to add an `id` attribute to your svgs.   

Can be applied to SVGs when you want to import SVGs through `<use>` tags (e.g. with `nextjs`). 

And could / should be combined with SVGO loader to achieve SVGR-like flexibility.

**Install**

- `yarn add svgid-loader -D`
- `npm i svgid-loader -D`

## Configuration and recommended defaults

```js
{
  // value for the id attribute
  id?: string,          // default = 'root'

  // set false to not overwrite existing id
  overwrite?: boolean   // default = false

  // set a custom selector to match the container element (e.g. `symbol`)
  selector?: string     // default = 'svg'
}
```

## Usage

```js
{
  test: /\.svg$/i,
    use: [
      {
        loader: 'svgid-loader',

        // provide options if you don't like the defaults
        options: {
          id: 'root',        // default value
          overwrite: false,  // default value
          selector: 'svg'    // default value
        },
      },
    ],
}
```

## Usage with nextjs 11

### Add loader to `nextjs.config.js`

```js

module.exports = {
  webpack(config, options) {
    // ...

    // 'push' it into rules to ensure svgs are being 
    // processed before `next-image-loader`

    config.module.rules.push({
    test: /\.svg$/i,
    use: [{
            loader: 'svgid-loader',
            options: {
                id: 'root',
                overwrite: true,
            },
        },
        {
            loader: 'svgo-loader',
            options: {
                multipass: true,
                plugins: require('svgo').extendDefaultPlugins([('convertStyleToAttrs', 'removeStyleElement')]),
            },
        },
      ],
    });
  }
  // ...
}
```

### Create Svg component

```typescript

// File components/Svg.tsx

export const Svg = ({ data, ...rest }: { data: StaticImageData } & React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			viewBox={`0 0 ${data.width} ${data.height}`}
			{...rest}
		>
			<use href={`${data.src}#root`} />
		</svg>
	);
};

```

### Use Svg component

```typescript

  // File components/HereWeUseSvgs.tsx

  import AuthSvg from '@fortawesome/fontawesome-pro/svgs/duotone/user-unlock.svg';
  import { Svg } from './Svg';
  // ...

  return <Svg data={AuthSvg} />
```
