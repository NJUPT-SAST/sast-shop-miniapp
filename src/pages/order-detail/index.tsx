import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Orderdetail from './order-detail'
import './index.scss'

export default function OrderDetail() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='order-detail'>
      <Orderdetail />
    </View>
  )
}
