# svgid-loader

Simple loader to add an `id` attribute to your svgs.

**Install**

- `yarn add svgid-loader -D`
- `npm i svgid-loader -D`

## Configuration

```js
{
  id?: string, // value for the id attribute
  overwrite?: boolean // set false to not overwrite existing id
}
```

## Usage

```js
{
  test: /\.svg$/i,
    use: [
      {
        loader: 'svgid-loader',
        options: {
          id: 'root',
          overwrite: true,
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
      use: [
        {
          loader: 'svgid-loader',
          options: {
            id: 'root',
            overwrite: true,
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

export const Svg = ({ data, ...rest }: { data: StaticImageData } & React.HTMLAttributes<SVGElement>) => {
	return (
		<svg
			viewBox={`0 0 ${data.width} ${data.height}`}
			width={data.width}
			height={data.height}
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
