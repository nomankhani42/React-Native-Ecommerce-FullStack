import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const data = [
  'https://www.whatmobile.com.pk/control/news/assets/01072021/0493a3885c6f579a00892b253987ce42.jpg',
  'https://www.whatmobile.com.pk/control/news/assets/17112023/bf3e000acebd23670f10bbcc7eda3f45.jpg'
];

const CarouselSlider = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={wp(100)}
        height={hp(30)}
        data={data}
        autoPlay={true}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{ uri: item }} 
              resizeMode="cover" // Adjust as needed, e.g., 'contain'
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(100),
    height: hp(40),
  },
});

export default CarouselSlider;
