# react-native-hashtags-input

Input component to manage hashtags like latest social network apps do

## Installation

```sh
npm install react-native-hashtags-input
```

## Usage

```js
import HashtagInput from 'react-native-hashtags-input';

export default function App() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <View style={styles.container}>
      <HashtagInput tagsArray={tags} setTagsArray={setTags} />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
