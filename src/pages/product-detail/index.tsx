import { View, Swiper, SwiperItem, Image, Button, ScrollView,Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import detail from '../../assets/images/detail.jpg'
import './index.scss'

export default function ProductDetail() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View
    style='overflow:hidden'
    >
      <Swiper
        className='swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        display-multiple-items
        >
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img1}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img2}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img3}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img4}></Image></SwiperItem>
      </Swiper>
        <View className="good-introduce">南京邮电大学校科协 SAST 2023 纪念定制短袖</View>
        <View className="good-price">￥99.00</View>
        <Button className='good-button'>立即购买</Button>

        <View className='type'>
          <View className='type-view'>颜色<Text className='type-item'>卡其色 深蓝色</Text></View>
          <View className='type-view'>尺码<Text className='type-item'>S M L XL 2XL 3XL 4XL</Text></View>
        </View>

        <View className='datail'>图片详情</View>

        <ScrollView
          className='scrollview'
          scrollY
          lowerThreshold={50}
          style='height:1200px width:100%'
          showScrollbar={false}
          enhanced={true}
        >
          <View className='long-picture'>
            <Image className='detail-picture' src={detail} mode='widthFix'></Image>
          </View>
        </ScrollView>
    </View>
  )
}
