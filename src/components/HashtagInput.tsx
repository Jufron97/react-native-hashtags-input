import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { TextStyle } from 'react-native';
import type { ColorValue, FlexStyle, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';

interface props {
  tagsArray: string[];
  setTagsArray: React.Dispatch<React.SetStateAction<string[]>>;
  justifyContent?: FlexStyle['justifyContent'];
  backgroundColor?: ColorValue | undefined;
  tagButtonStyle?: StyleProp<ViewStyle>;
  tagTextStyle?: StyleProp<TextStyle>;
  showHashtags?: boolean;
  inputFlexBasis?: number;
  tagTextInputStyle?: StyleProp<TextStyle>;
  maxHashtagLength?: number;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  maximumTags?: number;
  errorMessage?: string;
  showErrorMessage?: boolean;
}

const HashtagInput = ({
  tagsArray,
  setTagsArray,
  justifyContent,
  backgroundColor,
  tagButtonStyle,
  tagTextStyle,
  showHashtags = true,
  inputFlexBasis,
  tagTextInputStyle,
  maxHashtagLength = 20,
  placeholder = 'Add up to 5 hashtags. Ex. #lifestyle',
  placeholderTextColor = '#AAAAAA',
  maximumTags = 5,
  errorMessage = 'The maximum amount of tags is 5',
  showErrorMessage = true,
}: props): JSX.Element => {
  const [tag, setTag] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (t: string) => {
    let newArr = [...tagsArray];
    if (t === '') {
      newArr = newArr.slice(0, -1);
    } else if (tagsArray.length < maximumTags + 1 && t.trim()) {
      if (!tag.length && tagsArray.length === maximumTags) {
        setError(errorMessage);
        return;
      } else setError('');
      const index =
        tagsArray.length < 1 || !tag.length
          ? tagsArray.length
          : tagsArray.length - 1;
      newArr[index] = t;
    }
    setTagsArray(newArr);
    setTag(t);
  };

  const onPress = (i: number) => {
    setError('');
    i === tagsArray.length - 1 && focused && setTag('');

    setTagsArray(tagsArray.filter((_el, index) => index !== i));
  };

  const onBlur = () => {
    setTag('');
    setError('');
    setFocused(false);
  };

  const onSubmitEditing = () => {
    setTagsArray([...tagsArray]);
    setTag('');
  };

  return (
    <View style={[styles.wraper, { justifyContent, backgroundColor }]}>
      {tagsArray &&
        tagsArray.map((t, index) => {
          return (
            <Pressable
              style={[styles.tagButton, tagButtonStyle]}
              key={index}
              onPress={() => onPress(index)}
            >
              <Text style={[styles.tagText, tagTextStyle]}>
                {showHashtags ? '#' : ''}
                {t}
              </Text>
              <CloseCircleOutlined size={13} color="white" />
            </Pressable>
          );
        })}
      <View style={[styles.inputWraper, { flexBasis: inputFlexBasis }]}>
        {showHashtags && <Text style={styles.hashtagText}>#</Text>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          blurOnSubmit={false}
          onFocus={() => setFocused(true)}
          returnKeyType="done"
          maxLength={maxHashtagLength}
          onChangeText={(text) => handleChange(text)}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          value={tag}
          style={[styles.tagTextInput, tagTextInputStyle, { backgroundColor }]}
        />
      </View>
      {showErrorMessage && error !== undefined && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default HashtagInput;

const styles = StyleSheet.create({
  wraper: {
    flexDirection: 'row',
    //flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#343434',
    justifyContent: 'flex-start',
    padding: 5,
    alignItems: 'center',
  },
  tagTextInput: {
    backgroundColor: '#343434',
    color: 'white',
    height: 33,
    flex: 1,
    flexWrap: 'wrap',
  },
  tagButton: {
    backgroundColor: '#5C5C5C',
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginVertical: 5,
  },
  tagText: {
    fontSize: 14,
    marginRight: 3,
    color: 'white',
  },
  hashtagText: {
    fontSize: 16,
    paddingRight: -20,
    color: 'white',
    marginLeft: 10,
  },
  inputWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 150,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});
