import { View, Text, Input, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import input_icon from '../../assets/images/index/find.png'
import item_image from '../../assets/images/index/frame.png'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <View className='index-title'>
        <Text>商品列表</Text>
      </View>

      <View className='index-input'>
        <View className='input-image'>
          <Image mode='aspectFit' style='width: 25px;height: 25px' className='input-icon' src={input_icon}></Image>
        </View>
        <View className='input-text'>
          <Input type='text' placeholder='搜索想要的商品' placeholderStyle='color: #8a8a8a;' className='input' />
        </View>
      </View>

      <View className='index-body'>
        <View className='body-item'>
          <View className='item-image'>
            <Image mode='aspectFit' className='picture' style='height: 100px' src={item_image}></Image>
          </View>
          <View className='item-text'>
            <View className='text-title'>
              <Text>南京邮电大学校科协 SAST 2023 纪念定制短袖</Text>
            </View>
            <View className='text-money'>
              ￥99.00
            </View>
          </View>
        </View>
      </View>


    </View>
  )
}
