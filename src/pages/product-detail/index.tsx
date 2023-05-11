import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function ProductDetail() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='product-detail'>
      <Text>Hello world!</Text>
    </View>
  )
}
