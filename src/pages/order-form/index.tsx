import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function OrderForm() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='order-form'>
      <Text>Hello world!</Text>
    </View>
  )
}
