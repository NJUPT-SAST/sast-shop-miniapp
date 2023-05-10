import { View, Text, Swiper } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function OrderDetail() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='order-detail'>
      <Text>Hello world!</Text>
    </View>
  )
}
