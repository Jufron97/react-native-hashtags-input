import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import HashtagInput from 'react-native-hashtags-input';

export default function App() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <View style={styles.container}>
      <HashtagInput tagsArray={tags} setTagsArray={setTags} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
