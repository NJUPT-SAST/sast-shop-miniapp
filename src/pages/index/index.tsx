import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import item_image from '../../assets/images/index/frame.png'
import './index.scss'

export default function Index() {
  const [title, changeTitle] = useState('南京邮电大学校科协 SAST 2023 纪念定制短袖')
  const [price, changePrice] = useState('99')
  const [id, changeId] = useState('0')
  const [image, changeImage] = useState(item_image)
  const [indexObject, changeindexObject] = useState([{
    title: '南京邮电大学校科协 SAST 2023 纪念定制短袖',
    price: 99,
    image: item_image,
    id: 0
  }])

  const gotoDetail = () => {
    Taro.navigateTo({
      url: `/pages/product-detail/index?id=${id}`
    })
  }


  useEffect(() => {
    Taro.request({
      url: 'http://127.0.0.1:4523/m1/2655521-0-default/user/product',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.image)
        changeTitle(res.data.title)
        changePrice(res.data.price)
        changeId(res.data.id)
        changeImage(res.data.image)
        changeindexObject([{
          title: res.data.title,
          price: res.data.price,
          image: res.data.image,
          id: res.data.id
        }])
      }
    })
  }, [])

  useLoad(() => {
    // console.log('Page loaded.')
  })

  return (
    <View className='index'>

      {
        indexObject.map(({ title, price, id, image }) => {
          return <View className='body-item' key={id} onClick={gotoDetail}>
            <View className='item-image'>
              <Image mode='aspectFit' className='picture' style='height: 100px' src={image}></Image>
            </View>
            <View className='item-text'>
              <View className='text-title'>
                <Text>{title}</Text>
              </View>
              <View className='text-money'>
                ￥{price}
              </View>
            </View>
          </View>
        })
      }

    </View>
  )
}
