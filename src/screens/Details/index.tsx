import React, { FC } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { Localization } from '../../constants/localization';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen: FC<Props> = ({ route, navigation }) => {
    const { article } = route.params;
    const imageSource = article.urlToImage ? { uri: article.urlToImage } : require('../../assets/placeholder.png');

    return (
        <View style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={imageSource} style={styles.image} resizeMode="cover" />
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.meta}>
                    {(article.author || `${Localization.unknown} ${Localization.author}`)} • {new Date(article.publishedAt).toLocaleString()}
                </Text>
                {article.description ? <Text style={styles.text}>{article.description}</Text> : null}
                {article.content ? <Text style={styles.text}>{article.content}</Text> : null}

                {article.url ? (
                    <Pressable style={styles.button} onPress={() => Linking.openURL(article.url!)}>
                        <Text style={styles.buttonText}>{Localization.openInBrowser}</Text>
                    </Pressable>
                ) : null}

                <Pressable style={[styles.button, styles.secondary]} onPress={navigation.goBack}>
                    <Text style={[styles.buttonText, styles.secondaryText]}>{Localization.back}</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}


